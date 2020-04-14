module.exports = {
	name: 'id',
    description: 'information about the bots',
    args: true,
	execute(message, args) {
        const user = message.mentions.users.first()
        const member = message.guild.member(user)
        if (args[0] === 'server') {
            let serverName = message.guild.name
            let ServerID = message.guild.id
            message.reply('You are on; ' + serverName + ' here is the server id! ' + ServerID)
        } 
        if (member) {
            message.reply(`${member.username}'s id is` + member.id)
        } 
	},
};



