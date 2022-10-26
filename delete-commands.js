const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("0_Server 1_Global || 0_All 1_One || CommandID\n", function (answ){
    var place = parseInt(answ[0]);
    var number = parseInt(answ[1]);
    var commandID = answ.slice(3, answ.length);

    console.log(`Place = ${place}\nNumber = ${number}\nID = ${commandID}`)

    switch (place, number){
        case 0 && 0:  console.log("0.0");
                    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
                        .then(() => console.log('Successfully deleted all guild commands.'))
                        .catch(console.error); 
                    break;

        case 0 && 1:  console.log("0.1");
                    rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandID))
                        .then(() => console.log('Successfully deleted guild command'))
                        .catch(console.error);
                    break;

        case 1 && 0:  console.log("1.0");
                    rest.put(Routes.applicationCommands(clientId), { body: [] })
                        .then(() => console.log('Successfully deleted all application commands.'))
                        .catch(console.error);
                    break;

        case 1 && 1:  console.log("1.1");
                    rest.delete(Routes.applicationCommand(clientId, commandID))
                        .then(() => console.log('Successfully deleted application command'))
                        .catch(console.error);
                    break;

        default: console.log("Place or number are wrong");
    }

    rl.close();
})