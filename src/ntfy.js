import dotenv from 'dotenv';
dotenv.config();

let ntfyUrl = process.env.NTFY_URL;

export function sendNtfyOpen() {
    let message =  "Hackeriet is Open"
    fetch(ntfyUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    
        body: message
    },)
}

export function sendNtfyClosed() {
    let message = "Hackeriet is Closed"
    fetch( ntfyUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: message
    },)
}
