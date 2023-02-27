const { EmbedBuilder, WebhookClient } = require('discord.js');
const fs = require('node:fs');

module.exports = {
    send: function () {
        const data = JSON.parse(fs.readFileSync("./commands/otherjs/webhook.json"));
        const webhookClient = (data.url != undefined) ? new WebhookClient({ url: data.url }) : new WebhookClient({ id: data.id, token: data.token });

        webhookClient.send(data.webhook);
        console.log("Webhook Sent");
    }   
}