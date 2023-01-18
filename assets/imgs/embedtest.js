const { SlashCommandBuilder, EmbedBuilder, roleMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embedtest')
		.setDescription('Test how embeds work')
        .addSubcommand(subcommand => subcommand
            .setName('on')
            .setDescription('embed when on')
            .addIntegerOption(option => option
                .setName('players')
                .setDescription('How many players in server')
                .setRequired(true)
                .setMinValue(0).setMaxValue(10)))
        .addSubcommand(subcommand => subcommand
            .setName('none')
            .setDescription('embed when no one online')
            .addIntegerOption(option => option
                .setName('time')
                .setDescription('time when server will close')
                .setMinValue(0).setMaxValue(15)))
        .addSubcommand(subcommand => subcommand
            .setName('off')
            .setDescription('embed when off')),
	async execute(interaction) {
		
        if (interaction.options.getSubcommand() == 'on'){
            const player = interaction.options.getInteger('players');

            const embedOn = new EmbedBuilder()
            .setColor(65280)
            .setTitle(`${player} people are in game`)
            .setAuthor({ name: '1.12.2 Forge: Galacticraft', iconURL: 'https://imgur.com/NM4MbhW.png' })
            .setDescription('Server is active right now and you can join.')
            .setThumbnail('https://assets.webinfcdn.net/favicons/b/blog.aternos.org.ico')
            .setTimestamp()
            .setFooter({ text: 'Ec32.aternos.me:47219', iconURL: 'https://cdn.discordapp.com/attachments/1034413190597054534/1034414332391456788/img_on.png' });

		    return interaction.reply({ embeds: [embedOn] });

        } else if (interaction.options.getSubcommand() == 'off') {
            const operatorMention = roleMention(1001718925865799730);
            const embedOff = new EmbedBuilder()
            .setColor(16711680)
            .setTitle('Server is offline')
            .setAuthor({ name: '1.12.2 Forge: Galacticraft', iconURL: 'https://imgur.com/NM4MbhW.png' })
            .setDescription(`Server is offline. To turn it on again please call ${operatorMention}s.`)
            .setThumbnail('https://assets.webinfcdn.net/favicons/b/blog.aternos.org.ico')
            .setTimestamp()
            .setFooter({ text: 'Ec32.aternos.me:47219', iconURL: 'https://cdn.discordapp.com/attachments/1034413190597054534/1034414331800072202/img_off.png' });

		    return interaction.reply({ embeds: [embedOff] });

        } else if (interaction.options.getSubcommand() == 'none') {
            const stime = interaction.options.getInteger('time') ?? 5;

            const embedNone = new EmbedBuilder()
            .setColor(16776960)
            .setTitle('No one in the game')
            .setAuthor({ name: '1.12.2 Forge: Galacticraft', iconURL: 'https://imgur.com/NM4MbhW.png' })
            .setDescription(`Server is active right now and you can join, but it will stop within ${stime} minutes.`)
            .setThumbnail('https://assets.webinfcdn.net/favicons/b/blog.aternos.org.ico')
            .setTimestamp()
            .setFooter({ text: 'Ec32.aternos.me:47219', iconURL: 'https://cdn.discordapp.com/attachments/1034413190597054534/1034414332781535252/img_starting.png' });

		    return interaction.reply({ embeds: [embedNone] });
        }

	},
};