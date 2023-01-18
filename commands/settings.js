const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const mccheck = require('./otherjs/mccheck')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings') // Настройки бота
		.setDescription('Set up some stuff')
        .addSubcommand(subcommand => subcommand
            .setName('mc') // Подкоманда настройки авто проверки серверов
            .setDescription('Set up Minecraft server status auto-update here')
            .addStringOption(option => 
                option.setName('ip')
                .setDescription('Write your servers IP')
                .setRequired(true))
            .addStringOption(option => 
                option.setName('port')
                .setDescription('Write your servers port (default: "25565")'))
            .addIntegerOption(option => 
                option.setName('time')
                .setDescription('How often will checking happen (default: 5 minutes)')))
        .addSubcommand(subcommand => subcommand
            .setName('macros') // Подкоманда добавления макросов
            .setDescription('Set up some macros')
            .addStringOption(option => 
                option.setName('key')
                .setDescription('Set key for this macros')
                .setRequired(true))
            .addStringOption(option => 
                option.setName('text')
                .setDescription('Text of this macros')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('delete') // Подкоманда удаления макросов
            .setDescription('Delete Macros')
            .addStringOption(option => option
                .setName('dkey')
                .setDescription('Delete Macros with selected key')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('mcautotoggle') // Подкоманда для включения/выключения автопроверки
            .setDescription('Toggle MCAUTO status and start/pause function'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        // JSON файл содержащий настройки бота
        var settings = JSON.parse(fs.readFileSync("./commands/otherjs/settings.json", 'utf8'));

        console.log(settings);
        // Настройки каждого сервера хранятся по их guildId
        const sID = interaction.guildId;
        var data = {"id": sID, "mc": {}, "macros": []};
        var setId = undefined;

        // Проверка присутсвии настроек
        for (let i = 0; i < settings.length; i++) {
            const dId = settings[i].id;
            if (dId == sID){
                setId = i;
                data = settings[i];
                break;
            }
        }

        // Код в зависимости выбранной подкоманды
        switch (interaction.options.getSubcommand()) {
            case 'mc':
                const servId = interaction.options.getString('ip');
                const servPort = interaction.options.getString('port') ?? '25565';
                const time = interaction.options.getInteger('time') ?? 5;
                const status = false;

                // Записывает данные в объект
                data.mc = {"channel" : interaction.channel.id, "ip" : servId, "port" : servPort, "time" : time, "paused": status};
                mccheck.paused = status;
                // Запускает функцию autoCheckEx из файла mccheck.js
                mccheck.autoCheckEx(setId);
            break;
            case 'mcautotoggle':
                // Меняет переменную в mccheck.js
                mccheck.paused = !mccheck.paused;
                return interaction.reply(`MCAUTO status put to: ${mccheck.paused}`);
            break;
            case 'macros':
                const key = interaction.options.getString('key');
                const text = interaction.options.getString('text');
                // Запсывает ключ и текст макроса в объект
                data.macros.push({"key": key, "text": text});
            break;
            case 'delete':
                const dkey = interaction.option.getString('dkey');
                var x = true;
                // Удаляет макрос по ключу
                for (let i = 0; i < data.macros.length; i++) {
                    if (data.macros[i].key == dkey){
                        data.macros.splice(i, 1);
                        x = false;
                        break;
                    }
                }
                // Если такого ключа нетт выводит ошибку
                if (x) return interaction.reply(`Error: Macros with keyname ${dkey} does not exist`);
            break;
        }

        // Если до этого настроек не было она добавляется
        if (setId == undefined){
            settings.push(data);
        } else {
            // Если было то перезаписывается
            settings[setId] = data;
        }
        // Запись настроек обратно в JSON файл
        fs.writeFileSync("./commands/otherjs/settings.json", JSON.stringify(settings));

        return interaction.reply("Settings for this server was added/edited");
	},
};