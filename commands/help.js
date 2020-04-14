const { PREFIX } = require('../config');

module.exports = {
	name: 'help',
    description: 'List of all commands or info about a specific one',
    aliases: ['commands'],
    usage: '[Command name]',
	execute(message, args) {
        const data = [];
        const { commands } = message.bot;

        if (!args.length) {
            data.push('Heres a list of the commands!:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply(`I\`ve sent you a DM with all my commands!`);
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like i cat DM you, do you have DMs closed?');
                })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command) {
            return message.reply('Thats not a valid command!');
        }

        data.push(`Name: ${command.name}`);

        if(command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
        if(command.description) data.push(`Description: ${command.description}`);

        message.channel.send(data, { split: true });
	},
};