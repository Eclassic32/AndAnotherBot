const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Yes')
        .addSubcommand(subcommand => subcommand
            .setName("paper")
            .setDescription("paper"))
        .addSubcommand(subcommand => subcommand
            .setName("rock")
            .setDescription("rock"))
        .addSubcommand(subcommand => subcommand
            .setName("scissors")
            .setDescription("scissors")),
	async execute(interaction) {
        const gpt = bot();
        switch (interaction.options.getSubcommand()) {
            case 'paper':
                if(gpt == 2) {return await interaction.reply("Бот выбрал камень  | Хорош <:yeah_sung:1060073185694973982>")}
                else if(gpt == 0)  {return await interaction.reply("Бот выбрал ножницы  | Позорник <:trollface:1060073152807448576>")}
                else {return await interaction.reply("Бот также выбрал бумагу  | Два позорника <:whatQ:1060073218968387656>")}
                break;
            case 'rock':
                if(gpt == 0) {return await interaction.reply("Бот выбрал ножницы  | Хорош <:yeah_sung:1060073185694973982>")}
                else if(gpt == 1)  {return await interaction.reply("Бот выбрал бумагу  | Позорник <:trollface:1060073152807448576>")}
                else {return await interaction.reply("Бот также выбрал камень  | Два позорника <:whatQ:1060073218968387656>")}
                break;
            case 'scissors':
                if(gpt == 1) {return await interaction.reply("Бот выбрал бумагу  | Хорош <:yeah_sung:1060073185694973982>")}
                else if(gpt == 2)  {return await interaction.reply("Бот выбрал камень  | Позорник <:trollface:1060073152807448576>")}
                else {return await interaction.reply("Бот также выбрал ножницы  | Два позорника <:whatQ:1060073218968387656>")}
                break;
        }
	},
}

function bot() {
    return Math.floor(Math.random()*3);
}