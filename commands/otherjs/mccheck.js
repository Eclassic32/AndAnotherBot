const { AttachmentBuilder, EmbedBuilder, Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const client = new Client({intents: [GatewayIntentBits.Guilds]});

module.exports = {
    // Запуск функции из другого файла
    checkEx: async function (ip, port) {
        return await check(ip, port);
    },

    // нерабочие функции
    paused: false,
    autoCheckEx: async function(sId){
        autoCheck(sId);
    }
}
// Проверка статуса сервера
async function check(ip, port){
    const api = ip + ":" + port;

    // Получает инфу как JSON
    const servInfoJSON = await mcfetch(api, 'ping');
    // await console.log(servInfoJSON); // Тестовая функция
    await console.log(`Server Online: ${servInfoJSON.online}`);

    // Проверяет если сервер офлайн
    if (!(servInfoJSON.online)){
        const embedOff = new EmbedBuilder()
        .setColor(16711680)
        .setTitle('Server is offline/doesn\'t exist')
        .setDescription(`Server is offline OR this server doesn\'t exist. \nCheck servers name/port or ask help from operators.`)
        .setTimestamp()
        .setFooter({ text: ip + ':' + port, iconURL: discordIMG('1034414331800072202/img_off.png') });

        return await { embeds: [embedOff] };
    }        
        
    // Сервер онлайн
    // MAKING ATTACHMENT
    var attTxt = `${ip}.png`;
    // Проверяет если сервер хост это Атернос
    if (ip.includes("aternos"))
        attTxt = "Aternos.png";
    else 
        // Скачивает иконку сервера
        await dlBase64(servInfoJSON.icon, attTxt);
    // Добавляет иконку к ответу бота
    const attFile = await getServerIcon(attTxt);
    // END ATTACHMENT

    // Доп. информация в ответе
    var infoFields = [{name: 'Online', value: `${servInfoJSON.players.online}`, inline: true},{name: 'Maximum', value: `${servInfoJSON.players.max}`, inline: true}];
    // Проверяет наличие модов в сервере и добавляет к доп. информациям
    if (servInfoJSON.mods != undefined){
        var allMods = servInfoJSON.mods.names[0];
        for (let i = 1; i < servInfoJSON.mods.names.length; i++) {
            allMods += `, ${servInfoJSON.mods.names[i]}`;
        }
        infoFields.push({name: "Mods", value: allMods})
    }

    if (servInfoJSON.players.online == 0 && attTxt == "Aternos.png"){ // NO PLAYER
        // Создает ответ при случаи если игроков нет, а хост "Атернос"
        const embedNone = new EmbedBuilder()
        .setColor(16776960)
        .setTitle('No one in the game')
        .setAuthor({ name: `Aternos: ${servInfoJSON.version}`, iconURL: discordIMG('1047426746292633700/mc-icon.png') })
        .setDescription(`Server is active right now and you can join, but it will stop within 5 minutes.`)
        .addFields(infoFields)
        .setThumbnail(`attachment://${attTxt}`)
        .setTimestamp()
        .setFooter({ text: ip + ':' + port, iconURL: discordIMG('1034414332781535252/img_starting.png') });

        return await { embeds: [embedNone], files: [attFile] };

    } else { // ONLINE
        // Создает ответ в зависимости от сервера
        const embedOn = new EmbedBuilder()
        .setColor(65280)
        .setTitle('Server is online')
        .setAuthor({ name: servInfoJSON.version, iconURL: discordIMG('1047426746292633700/mc-icon.png') })
        .setDescription(`Server is active and you can join any time.`)
        .addFields(infoFields)
        .setThumbnail(`attachment://${attTxt}`)
        .setTimestamp()
        .setFooter({ text: ip + ':' + port, iconURL: discordIMG('1034414332391456788/img_on.png') });

        return await { embeds: [embedOn], files: [attFile] };
    }
}
// Нерабочая функция
async function autoCheck(sId){
    console.log(`paused: ${this.paused}`)
    if (this.paused) return 0;
    
    const settings = JSON.parse(fs.readFileSync("./commands/otherjs/settings.json", 'utf8'));
    const ip = settings[sId].mc.ip;
    const port = settings[sId].mc.port;
    const channel = client.channels.cache.get(settings[sId].mc.channel);
    const time = settings[sId].mc.time;

    setTimeout(async function() {
        // if (this.paused) return 0;
        const embed = await check(ip, port);
        await console.log(embed);
        await channel.send(embed);
        autoCheck(sId);
    }, 5*1000, 'automc');
}

// Берет информацию об сервере из API 
async function mcfetch(jsonURL) {
    try{
        const url = `https://api.mcsrvstat.us/2/${jsonURL}`;
        console.log('\n' + url); // DEV CONSOLE
        const response = await fetch(url);
        // Получает JSON ответ из API
        const jsonR = await response.json();
        return jsonR;
    } catch (e){
        console.log(e);
        return ("fetchError");
    }
}
// Берет картинку из базы данных Дискорда
function discordIMG(statusID){
    return `https://cdn.discordapp.com/attachments/1034413190597054534/${statusID}`;
}
// Берет иконку сервера из файлов
async function getServerIcon(attTxt){
    try{
        const file = new AttachmentBuilder(`assets/servers/${attTxt}`);
        return file;
    } catch(e) {
        return "x";
    }
}
// Скачивает картинку сервера из интернета
async function dlBase64(data, name){
    // Проверяет наличе иконки сервера
    if (fs.existsSync(`assets/servers/${name}`)) {
        console.log(`File Exists`);
        return 0;
    }

    fs.access(`assets/servers/${name}`, fs.F_OK, (err) => {
        if (err) {
          console.error(err)
          return
        }
      
        return '';
    })

    // Из base64 делает картинку
    let base64Image = data.split(';base64,').pop();
    
    // Сохраняет картинку как файл
    fs.writeFile(`assets/servers/${name}`, base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });
}
