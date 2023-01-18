const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomevent')
		.setDescription('Randomness event')
        .addSubcommand(subcommand => subcommand
            .setName("setup")
            .setDescription("Setup event"))
        .addSubcommand(subcommand => subcommand
            .setName("start")
            .setDescription("Start event")),
	async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'setup':

            break;
            case 'start':

            break;
        }
	},
}