//This session demonstrated that you can create a node application that isn't reliant on a server.
// We went to nodejs.org to reference how to find the api and how to use it
// E.g. Nodejs.org -> API -> File System

var fs = require("fs"); //File System: fs is a core module.  You don't need to install it as a dependency
var path = "demo.txt";

var fileText = "Hi there from nodeJS";

//This function performs the writing of the string to the file (note: this is the syncronous version)
fs.writeFileSync(path, fileText);

console.log("File created and written");