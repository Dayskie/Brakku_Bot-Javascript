const fs = require('fs');
const {Client, Attachment} = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

var jsonQ=require("jsonq");
var jsonObject = require('./serverBlacklist.json')
var databaseObject = jsonQ(jsonObject);

import { errorcode } from './errortype';
import { tokenKey, PREFIX, version } from './config';
import { blacklisted } from './blacklist';
import { Collection } from 'discord.js';

let Admin = '698804000476233729';
let Moderator = '698788635847294981';

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', () =>{
    console.log("Bot online");
})


bot.on('guildCreate', (guild) => {
    var ServerID = guild.id
    var serverName = guild.name;
    var new_server = {
        [serverName] : ServerID,
        "Blacklists":[""]
    }
    ///I OWN MY LIFE TO Forward Doge

    databaseObject.find('servers').append(new_server);
    console.log('joined server');
    console.log(jsonObject);
    fs.writeFile('./serverBlacklist.json', JSON.stringify(jsonObject, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
})



///main commands
bot.on ('message', message=>{
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.substring(PREFIX.length).split(" ");
    const commandName = args.shift().toLowerCase();



    if(!bot.commands.has(commandName)) return
    
    const command = bot.commands.get(commandName)

    try {
        command.execute(message, args, version);
    } catch (error) {
        message.reply(errorcode.error104);
    }

})
bot.on('message', message => {
    ///console.log(message.content);
    let wordArray = message.content.split(" ");
    ///console.log(wordArray);

    for(var i = 0; i < blacklisted.length; i++) {
        if(wordArray.includes(blacklisted[i])) {
            message.delete();
            message.reply('One of the words you said was blacklisted!'
            );
            break;
        }
    }
});

bot.login(tokenKey);