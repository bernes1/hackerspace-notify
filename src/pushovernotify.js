import dotenv from "dotenv";
import Push from "pushover-notifications";

//dotenv config
dotenv.config();

const p = new Push({
  user: process.env.PUSHOVER_USER,
  token: process.env.PUSHOVER_TOKEN,
});


export var openmsg = {
  // These values correspond to the parameters detailed on https://pushover.net/api
  // 'message' is required. All other values are optional.
  message: "The HackerSpace is open ", // required
  title: "Hackerspace is open 👀",
  sound: "defualt",
  device: "iphone",
  priority: 1,
};
export var closedmsg = {
  // These values correspond to the parameters detailed on https://pushover.net/api
  // 'message' is required. All other values are optional.
  message: "the Hackerspace is closed", // required
  title: "Hackerspace closed 👎",
  sound: "magic",
  device: "iphone",
  priority: 1,
};

export function sendPushover(message) {
  p.send(message, function (err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
}


