const { SlashCommandBuilder, Client, GatewayIntentBits} = require('discord.js');
const msg = require('./otherjs/remind');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await msg.sendMSG(interaction);
		await interaction.reply(interaction.channelId);
	},
};