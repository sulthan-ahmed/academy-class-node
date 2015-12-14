// load modules
//all are core modules because no ./ in the require (i.e. no dependency)
var http = require("http");
var path = require("path");
var fs   = require("fs");

//Read-Eval-Print-Loop, It provides a way to interactively run JavaScript and see the results.
// It can be used for debugging, testing, or just trying things out.
var repl = require("repl");

var portnumber = 3000;

//process.argv is just the parameters when you run the application
// e.g. node server.js hello so here, it just takes the length of the arguments
for (var i=0; i<process.argv.length; i++) {
    var value = process.argv[i];
    var next  = process.argv[i+1];

    //if there is -p or -port then use the next argument to determine the port
    // number so long as it is a number. Otherwise use the 3000 defined above
    switch (value) {
        case "-p":
        case "-port":
            //if it's NOT undefined and IS a number
            if (typeof next != "undefined" && !isNaN(parseInt(next))) {
                //then it passes the number as an integer (removing decimals) into the variable
                //used later
                portnumber = parseInt(next);
            }
            //breaks out of the switch
            break;
        //if there is a man in the argument list first or later then it will
        //display a bunch of console logs i.e. a manual
        case "man":
            console.log("Static Server for the Public Folder");
            console.log("User -p or -port to change the port number");
            //this exits the process
            process.exit();
    }
}

//creates a web server
//the callback (i.e. function) is ready to deal with any request and issue responses
var server = http.createServer(function(req, res) {
    //this respond when going to a url. This will print anything in the address field
    console.log("\tIncomming request: "+req.url);

    //this is a function used later for dealing with 'server error' i.e. when a file
    // can't be read
    function displayServerError() {
        console.error("\tFile Error reading static file");
        res.statusCode = 500;
        res.statusMessage = "Internal Server Error!";
        //set the header is html
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Server Error 500</h1><p>Internal Server Error</p>");
    }

    //this just checks that /info is present in the url. It uses a method to check
    //the position is 0
    if (req.url.indexOf("/info") == 0) {
        //set the correct header for the response (html), in case older browsers interpret
        //the response as plain text
        res.setHeader("Content-Type", "text/html");
        //end the response with a function. This returns some html in the showInformation()
        // you can just have res.end() without the function instead,
        // but nothing would be returned onscreen.
        res.end( showInformation() );
    } else {

        //path is just the module being used and join is the function
        //that joins a string with a url which is printed out in the console log
        var filepath = path.join("public", req.url);
        console.log("\tStatic request for file: "+filepath);

        //fs is a module being used. stat is asynchronous function that takes a path
        //and a callback as arguments.  The callback has two arguments err and stats
        fs.stat(filepath, function(err, stats) {
            //if it's not an error and the request is a file
            if (!err && stats.isFile()) {

                // readFile function to read file data and send to client
                //filepath as an argument and a callback
                fs.readFile(filepath, function(err, data) {
                    //error handler. it calls displayServerError function that deals
                    //with a situation where the file cannot be read
                    if (err) {
                        displayServerError();
                    } else {

                        //isolating the extension i.e. the point there is a '.' and
                        //putting it into the variable ext
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

                        //writes the response of 200 meaning it is OK
                        res.writeHead(200, {"Content-Type": type});
                        //it is sending the data (i.e. the file) back in the response
                        res.write(data);
                        res.end();

                        console.log("\tFile delivered of type: "+type);

                    }

                });

            } else {
                //this is when it does not find the file and handles it with a 404
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

// this is a function that builds some html and returns
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