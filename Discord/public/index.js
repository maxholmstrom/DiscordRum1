console.log("Hello world!");

const baseUrl = "http://localhost:3000";
const apiUrl = baseUrl + "/api";

async function testGet() {
    try {
        const response = await fetch(apiUrl + "/test");
        if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
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
        const result = await response.json();
        console.log(result);
    }
    catch(error) {
        console.error(error.message);
    }
}

testGet();
postMsg(createMessage("bingus", "hata floppa >:("));