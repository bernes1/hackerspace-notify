import { config } from "dotenv";
import { LogSnag } from "logsnag";
import mqtt from "mqtt";

//dotenv config
config();

const logsnag = new LogSnag({
  token: process.env.LTOKEN,
  project: "hackerstat",
});

const client = mqtt.connect(process.env.MQTTH);

async function notifyc() {
   await logsnag.publish({
  channel: "hackerstat",
  event: "Hackerspace",
  description: "The Space is closed",
  icon: "💀",
  tags: {
    closed: "Closed",
  },
  notify: true,
});
console.log("sent closed notfications ")
}

async function notifyo() {
await logsnag.publish({
  channel: "hackerstat",
  event: "Hackerspace",
  description: "The Space is open",
  icon: "👀",
  tags: {
    closed: "OPEN",
  },
  notify: true,
});
}

let previousState = "";

const topic = "hackeriet/space_state";

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
      notifyc();
      console.log("closed");
    } else if (previousState == "closed" && parsePayload.status === "OPEN") {
      // TODO:notify of change
      notifyo();
      console.log("OPEN");
    }

    previousState = parsePayload.status;
  });
});
