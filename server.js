const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("listening on port :" + PORT);
});

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/user", (req, res) => {
  res.render("user");
});
app.get("/privacy",(req,res)=>{
  res.render("privacy")
})
app.get("*", (req, res) => {
  res.render("4O4page", {
    error: {
      details: "404 page not found",
    },
  });
});
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
