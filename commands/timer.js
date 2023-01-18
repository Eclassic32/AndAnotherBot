// Подключение основной библеотеки
const { SlashCommandBuilder } = require('discord.js');
// Подключение внешнего кода
const reminder = require('./otherjs/remind');

module.exports = {
	data: new SlashCommandBuilder() // Создание комманды
		.setName('timer')
		.setDescription('Set timer and get pinged (hour + minute + second)')
        .addIntegerOption(option => option // Ввод числа пользователем
            .setName('hour')
            .setDescription('Set amount of hours (default: 0)'))
        .addIntegerOption(option => option // Ввод числа пользователем
            .setName("min")
            .setDescription("Set amount of minutes (default: 0)"))
        .addIntegerOption(option => option // Ввод числа пользователем
            .setName('sec')
            .setDescription('Set amount of seconds (default: 0)'))
        .addStringOption(option => option // Ввод текста пользователем
            .setName('text')
            .setDescription('Text that will be with ping')),
	async execute(interaction) {
        // В "opt" записывается все значения данные пользователем
        var opt = [interaction.options.getInteger('hour') ?? 0, interaction.options.getInteger('min') ?? 0,
         interaction.options.getInteger('sec') ?? 0, interaction.options.getString('text') ?? 'Unset text'];
        // Переменные передаются на внешний код "reminder"
		await interaction.reply(await reminder.command(interaction, opt));
	},
};