const socket = io();
let user = localStorage.getItem('username');
do {
  if (user !== undefined) {
    console.log("logged in as : " + user);
  } else {
    user = prompt("enter your name");
    localStorage.setItem("username", user);
  }
} while (!user);

let messages = document.querySelector(".messages");
let inputMsg = document.querySelector("#msg");
let status = document.querySelector(".status");

inputMsg.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    sendMessage(e.target.value);
    e.target.value = "";
    let msg = document.createElement("div");
    msg.classList.add("msg-send");
    msg.innerText = "message sent.";
    document.body.appendChild(msg);
    setTimeout(() => {
      document.body.removeChild(msg);
    }, 1500);
  } else {
    status.innerText = "typing...";
    const timer = setTimeout(() => {
      status.innerText = "";
    }, 1000);
  }
});
function sendMessage(msg) {
  let message = {
    username: user,
    message: msg.trim(),
  };

  // append message
  appendMessage(message, "outgoing-msg");
  // send to server
  socket.emit("message", message);
}
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "msg");
  let markup = `
    <h4 class='username'>${msg.username}</h4>
    <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messages.appendChild(mainDiv);
  messages.scrollTop = messages.scrollHeight;
}

// receive msg
socket.on("message", (msg) => {
  appendMessage(msg, "incoming-msg");
});
