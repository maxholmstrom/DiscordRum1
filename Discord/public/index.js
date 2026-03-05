const baseUrl = "http://localhost:3000";
const apiUrl = baseUrl + "/api";

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
        displayMessages(result.messages);
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

function displayMessages(allMessages ) {
    var messagesContainer = document.querySelector(".messages");
    allMessages .forEach(msg => {
        var message = document.createElement("div");
        message.innerHTML = `${msg.user}: ${msg.message}`;
        messagesContainer.appendChild(message);
    });
}

getMessages();
