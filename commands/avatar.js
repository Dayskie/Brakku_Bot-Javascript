module.exports = {
	name: 'avatar',
	aliases: ['icon' , 'pfp'],
	description: 'Show user avatar!',
	execute(message, args) {
        message.reply(message.author.displayAvatarURL());
	},
};