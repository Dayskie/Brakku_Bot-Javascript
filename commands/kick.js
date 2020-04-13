
module.exports = {
	name: 'kick',
    description: 'kick a user',
    args: true,
	execute(message, args) {
        const user = message.mentions.users.first()
        const member = message.guild.member(user)
        let KickReason = message.content.split(' ').slice(1);
        if(!member)
        {
            message.reply('blank')
        }else if(member){
                member.kick(KickReason)
                console.log(`Kicked for: ` + KickReason)
                
        }
	},
};