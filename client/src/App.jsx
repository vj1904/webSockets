import React, { useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000/"), []);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, roomId });
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
      setSocketId(socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.on("recieve-message", ({ message, socketId }) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
      setRoomId(socketId);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Box sx={{ height: "20vh" }} />
      <Typography variant="h4" component="div" gutterBottom>
        Welcome to Socket.io: {socketId}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          variant="outlined"
          label="Message"
        />
        <TextField
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          id="outlined-basic"
          variant="outlined"
          label="User Id"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
