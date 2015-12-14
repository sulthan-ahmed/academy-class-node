var express = require("express");
var app = express();

var server = app.listen(3000, function() {
    module.exports.serverRunning = true;
});

function addTwoValues(valA, valB) {
    return valA + valB;
}


module.exports = {

    expressApp: app,
    server: server,
    serverRunning: false,
    addTwoValues: addTwoValues

};

