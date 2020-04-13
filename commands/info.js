module.exports = {
	name: 'info',
    description: 'information about the bots',
    args: true,
	execute(message, args, version) {
        if (args[0] === 'version') {
        message.reply('BrakkuBot Version: ' + version);
        
        }
        else if (args[0] === 'github') {
            message.channel.send('Here is the github!: https://github.com/Brakku/Brakku_Bot')
        }
	},
};