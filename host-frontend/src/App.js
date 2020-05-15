import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const App = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>BattleSquare</h1>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <button>Create New Game!</button>
    </div>
  );
};

export default App;
