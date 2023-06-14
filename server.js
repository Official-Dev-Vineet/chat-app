const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fs = require("fs");

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log("listening on port :" + PORT);
});
app.use(express.static(__dirname + "/public"));
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// app.get("/user", (req, res) => {
//   res.render("user", (e) => {
//     console.log(e);
//   });
// });
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    fs.appendFile("./data.txt", "," + JSON.stringify(msg), (err) => {
      // console.log(err);
    });
    fs.readFile("./data.txt", "utf-8", (err, data) => {
      const newData= data.slice(0,1)
      // readedData.split('},')
     console.log(data)
    });
    socket.broadcast.emit("message", msg);
  });
});
