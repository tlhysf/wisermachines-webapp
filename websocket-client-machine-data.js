const io = require("socket.io-client");

const server = "http://115.186.183.129:37000";
const machineID = "5fe364175b9f4732f805349a";

const client = io(server, {
  transports: ["websocket"],
});

client.emit("send-data-demo-machine", { _id: "5fe364175b9f4732f805349a" });

client.on("data-demo-machine-5fe364175b9f4732f805349a", (parseJSON) => {
  try {
    console.log(parseJSON);
  } catch (e) {}
});
