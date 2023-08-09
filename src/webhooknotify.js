const dotenv = require('dotenv');
const { EmbedBuilder, WebhookClient } = require('discord.js');
dotenv.config();
const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK });


function sendDiscordOpen() {
    const embed = new EmbedBuilder()
        .setTitle('Hackeriet is open')
        .setColor(0);
    webhookClient.send({
        content: process.env.DISCORD_ROLE,
        username: 'Hackeriet',
        embeds: [embed],
    });
}

function sendDiscordClosed() {
    const embed = new EmbedBuilder()
        .setTitle('Hackeriet is Closed')
        .setColor(0);
    webhookClient.send({
        content: process.env.DISCORD_ROLE,
        username: 'Hackeriet',
        embeds: [embed],
    });
}

module.exports = { sendDiscordOpen: sendDiscordOpen, sendDiscordClosed: sendDiscordClosed };