import React from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";

const App = () => {
  const socket = io("http://localhost:3000/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
    });

    socket.on("message", (msg) => {
      console.log(msg);
    });
  }, []);

  return <div>App</div>;
};

export default App;
