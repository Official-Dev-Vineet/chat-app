const express = require("express");
const app = express();
const http = require("http").createServer(app);
const fs = require("fs");
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log("listening on port :" + PORT);
});
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    let oldMsg = [];
    fs.readFile("msg.json", "utf-8", (error, data) => {
      console.log(
        `${error ? "msg can not read from server" : "readed successfully"}`
      );
      data !== "" ? oldMsg.push(JSON.parse(data)) : "";
      let file=fs.writeFile("msg.json", JSON.stringify([msg]), (error) => {
        console.log(
          `${error ? "msg is not saving to server" : "msg saved to server"}`
        );
      console.log(file)
      });
    });
    socket.broadcast.emit("message", msg );
  });
});
