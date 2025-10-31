const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('test button'),
    async execute(interaction){
        const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Roll a Random Number')
			.setDescription('Click the button to roll a random number between 1 and 100.');

		const action = [
			new ActionRowBuilder().addComponents(
				new ButtonBuilder()
				.setCustomId('button_roll')
				.setLabel('Roll')
				.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
				.setCustomId('button_second')
				.setLabel('second')
				.setStyle(ButtonStyle.Primary),
			), 
			new ActionRowBuilder().addComponents(
				new ButtonBuilder()
				.setCustomId('button_third')
				.setLabel('third')
				.setEmoji('🌠')
				.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
				.setCustomId('button_forth')
				.setLabel('forth')
				.setEmoji('1060074143359434762')
				.setStyle(ButtonStyle.Primary),
			)];

		await interaction.reply({ embeds: [embed], components: action });
    }
}