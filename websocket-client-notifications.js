const io = require("socket.io-client");

const server = "http://115.186.183.129:27000";
const _id = "60547e1997960c1c34daa889";

const client = io(server, {
  // WARNING: in that case, there is no fallback to long-polling
  transports: ["websocket"], // or [ 'websocket', 'polling' ], which is the same thing
});

client.emit("send-data-alert", { _id });
// client.on('data',(msg)=>{
//     console.log(msg)
// })
client.on(`data-alert-${_id}`, (parseJSON) => {
  try {
    console.log(parseJSON);
  } catch (e) {}
});
