const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('macros')
		.setDescription('Use saved macros')
        .addStringOption(option => 
            option.setName('key') // Ключ установленного макрос
            .setDescription('Macros key')
            .setRequired(true)),
	async execute(interaction) {
        const key = interaction.options.getString('key');
        // Чтение файла с настройками
        const fileJSON = JSON.parse(fs.readFileSync("./commands/otherjs/settings.json", 'utf8'));
        const allMacros = fileJSON.find(function(element){
            // Нахождение объекта настроек данного сервера
            return element.id == interaction.guildId;
        }).macros;

        const macro = allMacros.find(function(element){
            // Нахождение определенного макроса по ключу
            return element.key == key;
        }) ?? undefined; // Приравить undefined если ключ отсутсвует
        
        console.log(macro);

        if (macro == undefined){
            // Если ключ отсутствует то бот пишет что такого макроса нет
            return interaction.reply(`Macros with key ${key} not found. Try again.`)
        }
        // Иначе возвращает текст макроса
        return interaction.reply(macro.text);    
	},
}