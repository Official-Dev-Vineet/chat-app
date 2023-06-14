let messages = document.querySelector(".messages");
let inputMsg = document.querySelector("#msg");
let msgStatus = document.querySelector(".status");
let ChatBg = document.querySelector("#chatBg");
let msgArea = document.querySelector(".message_area");
let setting = document.querySelector(".setting");
let timerRange = document.querySelector("#timerRange");
let timerValue = document.querySelector(".timerValue");
const body = document.body;
let timer = null;
let rangeStatus = false;

const socket = io(); // socket js file
let user = localStorage.getItem("username");
do {
  if (user !== undefined) {
  } else {
    user = prompt("enter your name");
    localStorage.setItem("username", user.trim());
  }
} while (!user);

// setting toggler
setting.querySelector(".settingIcon").addEventListener("click", () => {
  setting.querySelector(".settingMenu").classList.toggle("active");
});

//input handler
inputMsg.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value.trim());
    e.target.value = "";
    let msg = document.createElement("div");
    msg.classList.add("msg-send");
    msg.innerText = "message sent.";
    document.body.appendChild(msg);
    let timer = setTimeout(() => {
      document.body.removeChild(msg);
      return clearTimeout(timer);
    }, 1500);
  } else {
    msgStatus.innerText = "typing...";
    const timer = setTimeout(() => {
      msgStatus.innerText = "";
    }, 1000);
  }
});

// chat bg set
const setChatBg = () => {
  const arr = [
    "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18386.jpg?w=740&t=st=1685711232~exp=1685711832~hmac=33b4c1fdab7091fa5f0607057f24cf35f0d9b970eedb91174300ebe5cfc06b1e",
    "https://img.freepik.com/free-vector/speech-bubbles-collection_23-2147512511.jpg?w=740&t=st=1685711265~exp=1685711865~hmac=5110391c606557b445eb9c77928a3b352520c5674aa4d7fc1888233952d9c09b",
    "https://img.freepik.com/premium-photo/scattered-white-metal-screws-isolated-yellow_116124-2414.jpg?w=900",
    "https://img.freepik.com/free-photo/top-view-assortment-chat-bubbles-with-telephone-receiver_23-2148795987.jpg?w=826&t=st=1685711313~exp=1685711913~hmac=1225f337eb18a71fbc2377ac84e10c409886714710814abd06f7a635a5bc8acd",
    "https://img.freepik.com/free-photo/top-view-plastic-cups-attached-with-string-chat-bubbles_23-2148796060.jpg?w=900&t=st=1685711337~exp=1685711937~hmac=ba8c18f5ea8d7dbdc0fdb3bccb4eb91e3d9bd8a16ff06719be4fb1d37f7b862b",
    "https://img.freepik.com/free-vector/gradient-colored-background-with-geometrical-shapes_23-2149112687.jpg?w=900&t=st=1685711379~exp=1685711979~hmac=93c4a6682068181f0672509be639f668f0ff1c0586b9c0c52b9a9de3b3a20f04",
    "https://img.freepik.com/free-vector/blue-gradient-technology-background_23-2149112673.jpg?w=900&t=st=1685711403~exp=1685712003~hmac=8c17ad32283c7e0bfa0d2c2d0b44ed8564e399131e77504de3d78e86d1f0ff73",
    "https://img.freepik.com/free-vector/gradient-background-futuristic-style_23-2149129669.jpg?w=900&t=st=1685711436~exp=1685712036~hmac=f3bfbff4151add5773f109040e659dc3a987c9193399efa63a1e9879ab10c547",
  ];
  arr.forEach((src, index) => {
    const option = document.createElement("option");
    option.value = src;
    option.innerHTML = `<img src=${src} class="optionChatImage" alt='chatImg'/> <span>image :${
      index + 1
    }</span>`;
    ChatBg.appendChild(option);
  });
};

ChatBg.addEventListener("change", (e) => {
  msgArea.style.backgroundImage = `url(${e.target.value})`;
});
setChatBg();

function sendMessage(msg) {
  let message = {
    username: user,
    message: msg,
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
  let user = document.createElement("h4");
  let userMsg = document.createElement("p");
  user.textContent = msg.username;
  userMsg.textContent = msg.message;
  mainDiv.appendChild(user);
  mainDiv.appendChild(userMsg);
  messages.appendChild(mainDiv);
  messages.scrollTop = messages.scrollHeight;
}

// body background changer
function bodyColorChanger(delay = 30000) {
  timer = setInterval(() => {
    body.style.backgroundColor =
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "a");
  }, delay);
}
// slideCheckBox handler
body.querySelector("#BodyBGChange").addEventListener("click", async (e) => {
  e.target.value === "off" ? inputHandler("off") : inputHandler("on");
  function inputHandler(value) {
    if (value === "off") {
      e.target.value = "on";
      e.target.textContent = "on";
      timerRange.removeAttribute("disabled");
      bodyColorChanger();
    }
    if (value === "on") {
      e.target.value = "off";
      e.target.textContent = "off";
      timerRange.setAttribute("disabled", "disabled");
      clearInterval(timer);
    }
  }
});
// slide timer set by user
timerRange.addEventListener("change", async (e) => {
  timerValue.textContent = `Current : ${e.target.value * 10}s`;
  let delay = parseFloat(e.target.value);
  clearInterval(timer);
  bodyColorChanger(delay * 10000);
});

// receive msg
socket.on("message", (msg) => {
  appendMessage(msg, "incoming-msg");
});
