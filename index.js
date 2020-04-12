const {Client, Attachment} = require('discord.js');
const bot = new Client();

import { errorcode } from './errortype';
import { tokenKey, PREFIX, version } from './config';
import { blacklisted } from './blacklist';


bot.on('ready', () =>{
    console.log("Bot online");
})

function emote (id) {
    return bot.emojis.resolve(id).toString();
}

bot.on ('message', message=>{
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case "test":
            message.channel.send('hello, ${member}')
        break;
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
    

    }


})




bot.login(tokenKey);