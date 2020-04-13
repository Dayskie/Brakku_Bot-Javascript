module.exports = {
	name: 'avatar',
	description: 'Show user avatar!',
	execute(message, args) {
        message.reply(message.author.displayAvatarURL());
	},
};