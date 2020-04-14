module.exports = {
	name: 'shuffle',
	description: 'shuffle',
	execute(message, args) {
		message.channel.send ( {files: ["./reactions/shuffle.gif"]} )
	},
};