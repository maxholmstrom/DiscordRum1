console.log("Hello world!");

async function testGet() {
    try {
        const response = await fetch("http://localhost:3000/api/test");
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
