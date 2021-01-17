const io = require("socket.io-client");

const client = io("http://192.168.0.160:3001", {
  // WARNING: in that case, there is no fallback to long-polling
  transports: ["websocket"], // or [ 'websocket', 'polling' ], which is the same thing
});

client.emit("send-data-environment", { _id: "600195d461c4ce272c5630d7" });
// client.on('data',(msg)=>{
//     console.log(msg)
// })
client.on("data-environment-600195d461c4ce272c5630d7", (parseJSON) => {
  try {
    console.log(parseJSON);
  } catch (e) {}
});
