const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your React app URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat", (payload) => {
    console.log(payload);
    io.emit("chat", payload);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
