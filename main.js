// Подключение нужных модулей
require('dotenv').config(); // Загрузка переменных окружения из .env файла
const fs = require('node:fs'); // Управление файловой системой
const path = require('node:path'); // Модуль для определения путей к папкам/файлам
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js'); // Млдуль для подключения API Discord-a

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Сбор всех JS файлов в папке команд
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Подключение команд к боту
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Сбор всех JS файлов в папке кнопок
client.buttons = new Collection();
const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

// Подключение кнопок к боту
for (const file of buttonFiles) {
	const filePath = path.join(buttonsPath, file);
	const button = require(filePath);
	client.buttons.set(button.data.parent, button);
}

// Сбор всех JS файлов в папке событии
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Подключение и выполнение событии
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

console.log(client);

// Подключение бота к серверам в Discord-e
client.login(process.env.TOKEN);