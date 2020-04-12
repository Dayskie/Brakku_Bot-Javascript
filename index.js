const {Client, Attachment} = require('discord.js');
const bot = new Client();

var jsonQ=require("jsonq");
var jsonObject = require('./serverBlacklist.json')
var databaseObject = jsonQ(jsonObject);
var fs = require('fs');


import { errorcode } from './errortype';
import { tokenKey, PREFIX, version } from './config';
import { blacklisted } from './blacklist';

let Admin = '698804000476233729';
let Moderator = '698788635847294981';


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

bot.on('ready', () =>{
    console.log("Bot online");
})

function emote (id) {
    return bot.emojis.resolve(id).toString();
}
///main commands
bot.on ('message', message=>{
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case 'meme':
            var numberofMemes = 2;
            var memeImageNumber = Math.floor (Math.random() * (numberofMemes - 1 + 1)) + 1;
            message.channel.send ( {files: ["./memes/" + "meme" + memeImageNumber + ".jpg"]} )
        break;
        case 'emote':
            message.channel.send(emote('698732412221390888'));

        break;
        case 'avatar':
            message.reply(message.author.displayAvatarURL());
        break;
        case 'id':
            let serverName = message.guild.name
            let ServerID = message.guild.id
            message.reply('You are on; ' + serverName + ' here is the server id! ' + ServerID)
        break;
    case 'info':
        if(args[1] === 'version'){
            message.channel.send("Version " + version);
        }else if (args[1] === 'created'){
            message.channel.send("Created on the 3/12/2020!")
        } else if (args[1] === 'github'){
            message.channel.send("Here's the Github! https://github.com/Brakku/Brakku_Bot") 
        } else{
            message.channel.send(errorcode.error101) }
    break;

    case '':
        
        break;

    ///admin stuff
    case 'kick':
        const user = message.mentions.users.first()
        if(!message.member.roles.cache.has(Admin)){
            if(!message.member.roles.cache.has(Moderator)){
                message.reply(errorcode.error102)
            }
        } 
        const member = message.guild.member(user)
        if(member) {
            member.kick("Kicked loser (TEST)").then(() => {
                message.reply('${user.tag} was kicked!')
                
            })
            break;
        }else{ message.reply(errorcode.error103)
        break;
        }
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