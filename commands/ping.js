module.exports = {
	name: 'ping',
	description: 'Ping the user',
	execute(message, args) {
		message.reply('Pong.');
	},
};