const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();

var allowedOrigins = [
  "http://localhost:3000",
  "https://stupefied-hawking-a5c42a.netlify.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(index);

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIo(server); // < Interesting!

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("connectUser", (id) => {
    socket.join(id);
    console.log(id + ": user connected");
    io.to(id).emit("welcome", io.sockets.adapter.rooms[id]);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
