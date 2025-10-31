const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('codejs')
		.setDescription('Compile some code on JS')
        .addStringOption(option => option
            .setName('txt')
            .setDescription('Write your code')
            .setRequired(true)
        ),
	async execute(interaction) {
        const txt = interaction.options.getString("txt");
        console.log(interaction.user + txt);
        var reply = '';

        // Check for "include" or "require"
        if (txt.includes("include") || txt.includes("require")){
            return await interaction.reply("You can not use this");
        }

        // Capture the console output
        const originalConsoleLog = console.log;
        console.log = function(...args) {
          reply += args.join(" ") + "\n";
          originalConsoleLog.apply(console, args);
        }
        
        // Execute the code and capture the output
        eval(txt);
        
        // Restore the original console.log function
        console.log = originalConsoleLog;
        
        // Output the captured output
        console.log(reply);

        return await interaction.reply(reply);
    }
}