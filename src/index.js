var dotenv = require("dotenv");
var mqtt = require("mqtt");
const notify = require("./notify");
const sendPushover = notify.sendPushover;
const openmsg = notify.openmsg;
const closedmsg = notify.closedmsg;

//dotenv config
dotenv.config();

options = {
  clean: true, // retain session
  connectTimeout: 4000,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const client = mqtt.connect(process.env.MQTT_BROKER, options);

let previousState = "";

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
    if ((previousState == "OPEN" || previousState == "")  && parsePayload == "CLOSED") {
      sendPushover(closedmsg);
      console.log("CLOSED");
    } else if ((previousState == "CLOSED" || previousState == "")  && parsePayload == "OPEN") {
      sendPushover(openmsg);
      console.log("OPEN");
    }
    previousState = parsePayload;
  });
});
