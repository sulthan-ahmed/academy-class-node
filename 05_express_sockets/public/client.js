// get UI
var form = document.getElementById("messageForm");
var results = document.getElementById("results");
var input = document.getElementById("message");


// setup websocket

var socket = new WebSocket("ws://localhost:3000", ["echo-protocol"]);

socket.onmessage = function(event) {
    var li = document.createElement("li");
    li.innerHTML = "Message from server: "+event.data;

    results.appendChild(li);
};


form.addEventListener("submit", function(event) {
    event.preventDefault();
    var message = input.value;
    socket.send(message);
    input.value = "";
});