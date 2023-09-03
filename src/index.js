var dotenv = require("dotenv");
var mqtt = require("mqtt");
const notify = require("./notify");
const webhooknotify = require("./webhooknotify");
const sendPushover = notify.sendPushover;
const openmsg = notify.openmsg;
const closedmsg = notify.closedmsg;
const sendDiscordOpen = webhooknotify.sendDiscordOpen;
const sendDiscordClosed = webhooknotify.sendDiscordClosed;

//dotenv config
dotenv.config();

options = {
  protocol: 'mqtts',
  host: process.env.MQTT_BROKER,
  port: 8883,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clean: true, // retain session
  connectTimeout: 4000, // Timeout period
};
console.log(process.env.MQTT_BROKER);
const client = new mqtt.connect(options);

let previousState = ""; 

const States ={
  open: "OPEN", 
  closed: "CLOSED", 
  default: ""
}

const topic = process.env.MQTT_TOPIC;

client.on("reconnect", (error) => {
  console.log("reconnecting:", error);
});

client.on("error", (error) => {
  console.log("Connection failed:", error);
});

client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], console.log);
  client.on("message", (topic, payload) => {
    const parsePayload = payload.toString();
    if ((previousState == States.open || previousState == States.default)  && parsePayload == States.closed) {
      sendPushover(closedmsg);
      sendDiscordClosed();
      console.log("CLOSED");
    } else if ((previousState == States.closed || previousState == States.default)  && parsePayload == States.open) {
      sendPushover(openmsg);
      sendDiscordOpen();
      console.log("OPEN");
    }
    previousState = parsePayload;
  });
});
