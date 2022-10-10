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

//async function notifyo() {
//}
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
    //console.log('got the message:', topic, payload.toString())
    const parsePayload = JSON.parse(payload.toString());
    if (previousState == "") {
      // TODO:notify of change
      console.log(parsePayload.status);
    }
    // open is capital letters and closed is lowercase
    else if (previousState == "OPEN" && parsePayload.status === "closed") {
      // TODO:notify of change
      p.send(closedmsg, function (err, result) {
        if (err) {
          throw err;
        }

        console.log(result);
      });
      console.log("closed");
    } else if (previousState == "closed" && parsePayload.status === "OPEN") {
      // TODO:notify of change
      p.send(openmsg, function (err, result) {
        if (err) {
          throw err;
        }

        console.log(result);
      });
      console.log("OPEN");
    }

    previousState = parsePayload.status;
  });
});
