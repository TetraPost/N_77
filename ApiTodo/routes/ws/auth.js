const io = require('wsServ');
//const authCtrl = require('controllers/ws/auth');
//const { getListArticle } = require('controllers/ws/article');
const ss = require('socket.io-stream');
const stream = ss.createStream();
const fs = require('fs');

let interval;

io.on("connection", (socket) => {


  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
}
