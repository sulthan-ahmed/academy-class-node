// load modules
var http = require("http");
var path = require("path");
var fs   = require("fs");
var repl = require("repl");

var portnumber = 3000;

for (var i=0; i<process.argv.length; i++) {
    var value = process.argv[i];
    var next  = process.argv[i+1];

    switch (value) {
        case "-p":
        case "-port":
            if (typeof next != "undefined" && !isNaN(parseInt(next))) {
                portnumber = parseInt(next);
            }
            break;
        case "man":
            console.log("Static Server for the Public Folder");
            console.log("User -p or -port to change the port number");
            process.exit();
    }
}

var server = http.createServer(function(req, res) {
    console.log("\tIncomming requiest: "+req.url);

    function displayServerError() {
        console.error("\tFile Error reading static file");
        res.statusCode = 500;
        res.statusMessage = "Internal Server Error!";
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Server Error 500</h1><p>Internal Server Error</p>");
    }

    if (req.url.indexOf("/info") == 0) {
        res.setHeader("Content-Type", "text/html");
        res.end( showInformation() );
    } else {

        var filepath = path.join("public", req.url);
        console.log("\tStatic request for file: "+filepath);

        fs.stat(filepath, function(err, stats) {
            if (!err && stats.isFile()) {

                // read file data and send to client
                fs.readFile(filepath, function(err, data) {

                    if (err) {
                        displayServerError();
                    } else {

                        var ext = filepath.split(".").pop();

                        var type = "text/plain";

                        switch (ext) {

                            case "htm":
                            case "html":
                                type = "text/html";
                                break;

                            case "png":
                                type = "image/png";
                                break;

                            case "jpg":
                            case "jpeg":
                                type = "image/jpeg";
                                break;

                            case "css":
                                type = "text/css";
                        }

                        res.writeHead(200, {"Content-Type": type});
                        res.write(data);
                        res.end();

                        console.log("\tFile delivered of type: "+type);

                    }

                });

            } else {
                console.log("\t404 File Not Found");
                res.statusCode = 404;
                res.statusMessage = "File Not Found!";
                res.setHeader("Content-Type", "text/html");
                res.end("<h1>Server Error 404</h1><p>File Not Found</p>");
            }
        });

    }

});

server.listen(portnumber, function() {
    console.log("Server is running on http://localhost:"+portnumber);
});

// helper methods
function showInformation() {
    return "<!DOCTYPE html>" +
        "<html lang='eng'>" +
        "<head><title>Demo Response Info</title></head>" +
        "<body>" +
        "<h1>Information</h1>" +
        "<p>There server is running on port: "+ portnumber +
        "</p>" +
        "</body>" +
        "</html>";
}


// setup REPL

var replServer = repl.start("> ");
replServer.context.server = server;
replServer.context.doSomething = function() {
    console.log("HI there");
};

replServer.defineCommand('sayhello', {
    help: 'Say hello',
    action: function(name) {
        this.write('Hello, ' + name + '!\n');
        this.displayPrompt();
    }
});