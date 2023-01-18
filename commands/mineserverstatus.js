const { SlashCommandBuilder } = require('discord.js');
const { checkEx } = require('./otherjs/mccheck');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mineserver')
		.setDescription('Embed that shows minecraft server status')
        .addStringOption(option => 
            option.setName('ip')
            .setDescription('Write your servers IP')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('port')
            .setDescription('Write your servers port (default "25565")')),
	async execute(interaction) {
        const serverIP = interaction.options.getString('ip');
        const serverPort = interaction.options.getString('port') ?? '25565';
        await interaction.deferReply();

        const reply = await checkEx(serverIP, serverPort);        
        return await interaction.editReply(reply);
        // return await interaction.editReply("End");      
	},
}