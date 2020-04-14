//Start using better names for variables as let,var
//
//
const fs = require('fs');
const {Client, Attachment} = require('discord.js');
import { Collection } from 'discord.js';
const bot = new Client();
bot.commands = new Collection();

//this for using enverionment variables
const dotenv = require('dotenv');

//lowDB stuff better than the system that was before
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('serverBlacklist.json');
const db = low(adapter);



import { tokenKey, PREFIX, version } from './config';
import { blacklisted } from './blacklist';
import { errorcode } from './errortype';

let Admin = '698804000476233729';
let Moderator = '698788635847294981';

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.once('ready', () =>{
    console.log("Bot online");
})


bot.on('guildCreate', (guild) => {
    var ServerID = guild.id
    var serverName = guild.name;

    //This thing is cooler to be serious
    db.get('servers').push({ [serverName]: ServerID, "Blacklists":[""]}).write();
    

    ///I OWN MY LIFE TO rflx#5967
    ///YOU OWN AGAIN YOUR LIFE TO rflx#5967
  
    console.log('I joined a server');
  
})



///main commands
bot.on ('message', message=>{
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;
    
    try {
        command.execute(message, args, version);
    } catch(error) {
        console.error(error);
        message.reply(errorcode.error104);
    };
    

    

})

bot.on('message', message => {
     let wordArray = message.content.split(" ");
 
    let currentServerId = message.guild.id.toString();
    let currentServerName = message.guild.name;

    let foundServer = db.get('servers').find( {[currentServerName] : currentServerId }).value(); // 
    let serverObj = JSON.parse(JSON.stringify(foundServer)) //Some fancy stuff to fix the JSON object

    let serverBlacklistedWords = serverObj['Blacklists'];

    serverBlacklistedWords.forEach(function(blacklistedWord) {
        if(wordArray.includes(blacklistedWord)){
           message.reply("Those kind of words are not welcome here !").then(message.delete().then(message => console.log(`Deleted message from ${message.author.username}`)).catch(console.error)).catch(console.error); // using promises is cooler because you can delete multiple messages at the same time in multiple servers
        }
    });

});
bot.login('Njk4NDEyMzE2ODkwMzY2MDI0.XpUE2A.3eHtG7RCoZf5QPdsSV-pXyfGkdI')
///bot.login(process.env.TOKEN_KEY);