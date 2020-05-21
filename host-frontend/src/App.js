import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import axios from "axios";
//const ENDPOINT = "http://206.189.27.147:4001";
const ENDPOINT = "http://localhost:4001";

const App = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    axios
      .get(ENDPOINT + "/create")
      .then((res) => {
        console.log(res.data.id);
        setId(res.data.id);
      })
      .catch((err) => console.log(err));
  }, []);

  const createGameHandler = () => {};

  const socket = socketIOClient(ENDPOINT);
  const joinGameHandler = () => {
    socket.emit("connectUser", id);
  };

  socket.on("welcome", (msg) => {
    console.log(msg);
  });

  return (
    <div className="App">
      <h1>BattleSquare</h1>
      {id ? <h2>{id}</h2> : null}
      <button onClick={createGameHandler}>Create New Game!</button>
      <button onClick={joinGameHandler}>Join Game!</button>
      <input></input>
    </div>
  );
};

export default App;
