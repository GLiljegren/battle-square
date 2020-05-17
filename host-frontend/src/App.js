import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
//import axios from "axios";
const ENDPOINT = "https://206.189.27.147:4001";

const App = () => {
  const [id, setId] = useState(null);

  useEffect(() => {}, []);

  const createGameHandler = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("create", (_id) => {
      setId(_id);
    });
  };

  return (
    <div className="App">
      <h1>BattleSquare</h1>
      {id ? <h2>{id}</h2> : <h2>no id</h2>}
      <button onClick={createGameHandler}>Create New Game!</button>
      <input></input>
    </div>
  );
};

export default App;
