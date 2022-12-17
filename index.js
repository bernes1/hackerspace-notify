var dotenv = require("dotenv");
var mqtt = require("mqtt");
var Push = require("pushover-notifications");

//dotenv config
dotenv.config();

const p = new Push({
  user: process.env.PUSHOVER_USER,
  token: process.env.PUSHOVER_TOKEN,
});

var openmsg = {
  // These values correspond to the parameters detailed on https://pushover.net/api
  // 'message' is required. All other values are optional.
  message: "The hacker Space is open ", // required
  title: "Hackerspace is open 👀",
  sound: "defualt",
  device: "iphone",
  priority: 1,
};
var closedmsg = {
  // These values correspond to the parameters detailed on https://pushover.net/api
  // 'message' is required. All other values are optional.
  message: "the hackerspace is closed now", // required
  title: "Hackerspace closed 👎",
  sound: "magic",
  device: "iphone",
  priority: 1,
};

options = {
  clean: true, // retain session
  connectTimeout: 4000,
  port: 8883,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};
const client = mqtt.connect(process.env.MQTTH, options);

let previousState = "";

const topic = process.env.TOPIC;

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
      p.send(closedmsg, function (err, result) {
        if (err) {
          throw err;
        }

        console.log(result);
      });
      console.log("CLOSED");
    } else if ((previousState == "CLOSED" || previousState == "")  && parsePayload == "OPEN") {
      p.send(openmsg, function (err, result) {
        if (err) {
          throw err;
        }

        console.log(result);
      });
      console.log("OPEN");
    }

    previousState = parsePayload;
  });
});
