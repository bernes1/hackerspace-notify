const dotenv = require('dotenv');
dotenv.config();

let discordUrl = process.env.DISCORD_WEBHOOK

function sendDiscordOpen() {
    let message = {"username": "hackeriet", "content": "Hackeriet is Open " + process.env.DISCORD_ROLE_ID}
    fetch(discordUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    
        body: JSON.stringify(message)
    },)
}

function sendDiscordClosed() {
    let message = {"username": "hackeriet", "content": "Hackeriet is Closed " + process.env.DISCORD_ROLE_ID}
    fetch(discordUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    },)
}

module.exports = { sendDiscordOpen: sendDiscordOpen, sendDiscordClosed: sendDiscordClosed };