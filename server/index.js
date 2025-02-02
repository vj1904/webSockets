import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connect", (socket) => {
  console.log("User Connected");
  console.log("Socket id: ", socket.id);

  // emit a welcome message when a user is connected
  socket.emit("welcome", `Welcome to the server.`);

  // broadcast a notification when a new user is connected to the server/IO
  socket.broadcast.emit("welcome", `User: ${socket.id}, joined the server`);

  // handle the message sent by the user and broadcast it to other users
  socket.on("message", ({ message, roomId }) => {
    const socketId = socket.id;
    io.to(roomId).emit("recieve-message", { message, socketId });
  });

  // handle the disconnct event before the page is repainted and user's socket id changes.
  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`server running at port: ${port}`);
});
