import dotenv from 'dotenv';
dotenv.config();

let discordUrl = process.env.DISCORD_WEBHOOK;
export function sendDiscordOpen() {
    let message = {"username":  process.env.DISCORD_USERNAME, "content": "Hackeriet is Open " + process.env.DISCORD_ROLE_ID}
    fetch(discordUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    
        body: JSON.stringify(message)
    },)
}

export function sendDiscordClosed() {
    let message = {"username": process.env.DISCORD_USERNAME, "content": "Hackeriet is Closed " + process.env.DISCORD_ROLE_ID}
    fetch(discordUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    },)
}