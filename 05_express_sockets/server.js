var express = require("express");
var WebSocketServer = require("websocket").server;

// make app
var app = express();

app.use(express.static("public"));

app.use("*", function(req, res) {
    res.status(404).send("<h1>Server Error 404</h1><p>File Not Found: "+req.originalURL+"</p>");
});

// start server
var server = app.listen(3000, function() {
    console.log("Server running on port 3000");
});

// setup websocket
var socketServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});


socketServer.on("request", function(request) {
    console.log("Incoming request for websocket "+request.origin);

    var connection = request.accept("echo-protocol", request.origin);

    connection.sendUTF("Welcome to the websocket server");

    connection.on("message", function(message) {
        console.log("Incoming message: "+message.utf8Data);
        connection.sendUTF("Server has received your message");
    });

    connection.on("close", function() {
        console.log("Socket connection closed");
    });

});