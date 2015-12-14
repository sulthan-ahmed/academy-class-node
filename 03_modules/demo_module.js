var valA = 0;
var valB = 0;

function setValues(a,b) {
    valA = a;
    valB = b;
}

function addValues() {
    return valA + valB;
}

//this exposes our methods and variables to the public (i.e. other modules to use)
// we can also control which ones we want to expose
module.exports = {

    // the name of the functions or variables exposed can be changed as highlighted in the left side so addValues
    //has been changed to getAnswer
    setValues: setValues,
    getAnswer: addValues

};