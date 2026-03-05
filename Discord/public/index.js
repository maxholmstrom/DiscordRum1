console.log("Hello world!");

const baseUrl = "http://localhost:3000";
const apiUrl = baseUrl + "/api";

async function getMessages() {
    try {
        const response = await fetch(apiUrl + "/messages");
        if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result.messages);
    }
    catch(error) {
        console.error(error.message);
    }
}

function createMessage(username, message) {
    return {
        user: username,
        message: message
    };
}

async function postMsg(msg) {
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

getMessages();
