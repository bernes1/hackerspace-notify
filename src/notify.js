var dotenv = require("dotenv");
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

function sendPushover(message) {
  p.send(message, function (err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
}




module.exports = {sendPushover: sendPushover, openmsg : openmsg, closedmsg : closedmsg};