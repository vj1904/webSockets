import express from "express";
import { Socket } from "node:dgram";
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

io.on("connection", (Socket) => {
  console.log("User Connected");
  console.log("User id: ", Socket.id);
});

server.listen(port, () => {
  console.log(`server running at port: ${port}`);
});
