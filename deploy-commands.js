const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// Берет все файлы из папки commands 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Делает команду из каждого файла 
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Подготовка бота к подставке новых комманд
const rest = new REST({ version: '10' }).setToken(token);

// Функция подставки команд
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Подставляет комманды для определенного сервера
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// При наличии вывести все ошибки
		console.error(error);
	}
})();