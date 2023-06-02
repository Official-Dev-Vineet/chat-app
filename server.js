const { error } = require("console");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const fs=require('fs')

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log("listening on port :" + PORT);
});
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
const io=require('socket.io')(http)

io.on("connection", (socket) => {
  socket.on("message", (msg) => { 
    let data=fs.readFile('msg.json','utf-8',(error)=>{
        console.log(`${error ? 'msg can not read from server': 'readed successfully'}`);
        
    })
    fs.writeFile('msg.json',JSON.stringify(msg),(error)=>{
            console.log(`${error ? 'msg is not saving to server': 'msg saved to server'}`)
    })
    socket.broadcast.emit("message", msg);
    console.log(`${msg.username} successfully connected`);
  });
});
