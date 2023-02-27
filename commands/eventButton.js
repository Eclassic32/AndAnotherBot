const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mobevent')
		.setDescription('Random Mob Event')
        .addSubcommand(subcommand => subcommand
            .setName("setup")
            .setDescription("Setup event"))
        .addSubcommand(subcommand => subcommand
            .setName("start")
            .setDescription("Start event"))
        .addSubcommand(subcommand => subcommand
            .setName("random")
            .setDescription("Start event without button"))
        .addSubcommand(subcommand => subcommand
            .setName("single")
            .setDescription("Get random mob")
            .addUserOption(option => option
                .setName("target")
                .setDescription("Choose mob for other person"))),
	async execute(interaction) {
        const mobs = JSON.parse(fs.readFileSync("./commands/otherjs/mobname.json", 'utf8'));
        const max = mobs.length;
        var reply = '';

        switch (interaction.options.getSubcommand()) {
            case 'setup':
                reply = 'Not made yet';
            break;
            case 'start':
                reply = 'Not made yet';
            break;
            case 'single':
                const target = interaction.options.getUser("target") ?? interaction.member;
                const sing = chooseMob(max);
                reply = `${target} got mob #${sing} - ${mobs[sing]}`;
            break;
            case 'random':
                const player = ['Amir', 'Ec32', 'Damir', 'Arsen', 'Artem', 'Ilyas', 'Aruna', 'Madik'];

                var result = Array(player.length);

                for(var i=0; i<player.length;i++) {
                    do {
                        var failed = false;
                        var mob = chooseMob(max);
                        for(var j=0; j<i;j++) {
                            if(mob == result[j]) {failed = true; break;} 
                        }
                        result[i] = mob;
                    }while(failed);
                }

                for (let i = 0; i < player.length; i++) {
                    const num = result[i];
                    reply += `> ${player[i]} get mob #${num} - ${mobs[num]} \n`;
                }
                break;
            }

        return await interaction.reply(reply);
	},
}

function chooseMob(number) {
    return Math.floor(Math.random()*number);
}