const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    data: {parent: "button", commands: ["roll"]},
    async execute(interaction) {
		const btnName = interaction.customId.substring(interaction.customId.indexOf('_')+1, interaction.customId.size);
        switch (btnName) {
            case 'roll':
                const randomNumber = Math.floor(Math.random() * 100) + 1;
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Random Number Rolled')
                    .setDescription(`You rolled a ${randomNumber}!`);
            
                return await interaction.update({ embeds: [embed], components: [] });   
            
            case 'second': 
                const embedS = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Second btn')
                    .setDescription(`works`);
            
                return await interaction.update({ embeds: [embedS], components: [] });  

            case 'third': 
                const embedT = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('3')
                    .setDescription(`return btns`);
            
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

                return await interaction.update({ embeds: [embedT], components: action }); 

            case 'forth': 
                const embedF = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('4')
                    .setDescription(`works`);
            
                return await interaction.update({ embeds: [embedF], components: [] }); 
        
            default:
                await interaction.update('button id not found');   

                break;
        }


          
	},
}