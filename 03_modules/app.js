console.log("App Running");

//this is how to we call a module that we have made
var demo = require("./demo_module");

//Because demo is a variable refers to our module, we can call the function setValues as
//defined in where we exposed it
demo.setValues(10, 20);

//get answer is a method in our demo module
console.log("Answer = "+demo.getAnswer());

//variables can be used to refer to a folder containing files, or we can directly
//reference a file within a folder.

//users variable refers to the users file within the apis folder.
var users = require("./apis/users");

//apis variable refers to the folder.  You then need to create a index.js file within the api folder.
//in this file you will expose the files as shown in index.js
var apis = require("./apis");

//we can now directly invoke the news file's functions, using 'apis.news', then call the function within
apis.news.getNews();

// or we can use the shorthand method of 'users' (we could have called apis.users.getInfo() and got the same
// result.
users.getInfo();

// process.argv is an array containing a list of items included in the command last invoked.
// argv[0] always refers to the node software itself, and is not used.
// argv[1] return the full pathname of the file linked to the command last issued.
// argv[X] can be any number of arguments of your choosing. You are limited only by imagination.
// e.g. two arguments can refer to two filenames, one could be a source file, the other a destination
// file for a file process.
// e.g npm run copy FILE1 FILE2 - your program can then access FILE1 and FILE2 via argv[2] amd argv[3]
console.log("Arguments = "+process.argv);

//this is an example of using a third party module (or sometimes refered to as library or api)
// unfortunately we don't use it in this example as it's entirely command based
var $ = require("jquery");

