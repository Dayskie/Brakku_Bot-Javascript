module.exports = {
	name: 'meme',
	description: 'Sends a meme.',
	execute(message, args) {
        var numberofMemes = 2;
        var memeImageNumber = Math.floor (Math.random() * (numberofMemes - 1 + 1)) + 1;
        message.channel.send ( {files: ["./memes/" + "meme" + memeImageNumber + ".jpg"]} )
	},
};