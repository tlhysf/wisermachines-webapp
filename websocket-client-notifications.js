const io = require("socket.io-client");

const client = io("http://115.186.183.129:27000", {
  // WARNING: in that case, there is no fallback to long-polling
  transports: ["websocket"], // or [ 'websocket', 'polling' ], which is the same thing
});

client.emit("send-data-alert", { _id: "60547e1997960c1c34daa889" });
// client.on('data',(msg)=>{
//     console.log(msg)
// })
client.on("data-alert-60547e1997960c1c34daa889", (parseJSON) => {
  try {
    console.log(parseJSON);
  } catch (e) {}
});
