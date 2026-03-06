"use strict";

const apiUrl = "/api";
const messagePollingRateMs = 2000;

const sendBtn = document.getElementById("sendBtn");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.querySelector(".messages");

// Hämtar alla meddelanden från servern
// Returnerar null om vi inte fick ett svar
async function getMessages() {
    try {
        const response = await fetch(apiUrl + "/messages");
        if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result.messages);
        return result.messages;
    }
    catch(error) {
        console.error(error.message);
    }
    return null;
}

// Skapa ett meddelande objekt
function createMessage(username, message) {
    return {
        user: username,
        message: message,
        time: Date.now()
    };
}

// Posta ett meddelande till servern
async function postMessage(msg) {
    try {
        const response = await fetch(apiUrl + "/messages", {
            method: "POST",
            body: JSON.stringify(msg),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
        }
        console.log(`Post message status: ${response.status}`);
    }
    catch(error) {
        console.error(error.message);
    }
}

function getUsernameColor(username) {
    let charc1 = username.charCodeAt(0);
    let charc2 = username.charCodeAt(username.length - 1);
    let cmod = (charc1 + charc2) % 6;
    switch(cmod) {
        case 0:
            return "#f87777";
        case 1:
            return "#cdb801";
        case 2:
            return "#6b6bf4";
        case 3:
            return "#7dc000";
        case 4:
            return "#35aa8b";
        case 5:
            return "#c36ac3";
    }
    return "#ffffff";
}

function displayMessages(allMessages ) {
    var messagesContainer = document.querySelector(".messages");
    messagesContainer.innerHTML = "";
    allMessages .forEach(msg => {
        const date = new Date(msg.time);
        const formattedDate = date.toLocaleDateString("sv-SE");
        
        var messageDiv = document.createElement("div");
        messageDiv.classList.add("message-div");

        var messageHead = document.createElement("div");
        messageDiv.appendChild(messageHead);

        var messageUsername = document.createElement("span");
        messageUsername.innerHTML = `${msg.user}`;
        messageUsername.style = `color: ${getUsernameColor(msg.user)}`;
        messageHead.appendChild(messageUsername);

        var messageTime = document.createElement("span");
        messageTime.innerHTML = ` on ${formattedDate.toString()}`;
        messageTime.classList.add("message-time");
        messageHead.appendChild(messageTime);

        var messageBody = document.createElement("div");
        messageBody.innerHTML = `${msg.message}`;
        messageDiv.appendChild(messageBody);

        messagesContainer.appendChild(messageDiv);
    });
}

async function sendCurrentMessage() {
  const name = (nameInput.value || "").trim();
  const text = messageInput.value;

  if (!text.trim()) return;

  await postMessage(createMessage(name, text));
  messageInput.value = "";
  await getMessages();
}

sendBtn.addEventListener("click", async () => {
  try {
    await sendCurrentMessage();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

messageInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    try {
      await sendCurrentMessage();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
});
async function pollOnlyNewMessages() {
    try {
        const messages = await fetch(apiUrl + "/messages", {
            headers: {
                "X-Poll": "yes"
            }
        });

        if (!messages.ok) {
            throw new Error(`Response status: ${messages.status}`);
        }
        const result = await messages.json();
        console.log(result.messages);
        return result.messages;
    }
    catch (error) {
        console.error(error.message);
    }
    return null;
}

async function pollMessages() {
    const messages = await pollOnlyNewMessages();
    displayMessages(messages);
    setTimeout(pollMessages, messagePollingRateMs);
}

getMessages()
    .then(displayMessages)
    .then(pollMessages)
    .catch(console.error);
