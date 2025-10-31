const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()){
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		} else if (interaction.isButton()){
			console.log(interaction);
			const parent = interaction.customId.substring(0, interaction.customId.indexOf('_'));
			const button = interaction.client.buttons.get(parent);
			if (!button) {
				console.error(`No command matching ${interaction.customId} was found.`);
				return;
			}
			try {
				await button.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.customId}`);
				console.error(error);
			}
		} else return;
	},
};