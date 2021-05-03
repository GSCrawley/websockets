const sendBtn = document.querySelector('#send')
const messages = document.querySelector('#messages')
const messageInput = document.querySelector('#message-input')
const nameInput = document.querySelector('#name-input')

let ws

// Display messages from the websocket
function showMessage(data) {
  messages.innerHTML += `<li>${data.name}:${data.message} ${data.date}\n\n</li>` // display the message
  messages.style.color = "orange";
  // messages.style.border = "1px solid #FF0000"
  messages.scrollTop = messages.scrollHeight // scroll to the top
  messageInput.value = "" // clear the input field
  }
  
  function init() {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }
  
    // Make a new Websocket
    ws = new WebSocket('ws://localhost:6969')
  
    // Handle the connection when it opens
    ws.onopen = () => {
      console.log('!Connection opened!')
    }
    // handle a message event
    ws.onmessage = (e) => showMessage(JSON.parse(e.data))
    
    // Handle a close event
    ws.onclose = () => {
      ws = null
  }
}
  sendBtn.onclick = function () {
    if (!ws) {
        showMessage("No WebSocket connection :(");
        return;
        }
        const date = new Date(Date.now() * 1000)
        const data = { message: messageInput.value, name: nameInput.value, date: date }
        ws.send(JSON.stringify(data))
        console.log(data)
        showMessage(data)
    }
  
  init();