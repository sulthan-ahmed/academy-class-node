function sayHello(name) {
    console.log("Hi there "+name);
}

var names = ["Brian", "Peter", "Mary", "Evil Sid", "Mr Pie Eater"];

//
//for (var i=0; i<names.length; i++) {
//    sayHello(names[i]);
//    console.log("Type of I = "+typeof i);
//}
//
//var person = {
//    name: "Leon",
//    age: 40,
//    likes: "Pies"
//};
//
//for (var prop in person) {
//    console.log(prop + " = " + person[prop]);
//    console.log("Type of I = "+typeof prop);
//}
//
//for (var i in names) {
//    console.log(prop + " = " + names[i]);
//    console.log("Type of I = "+typeof i);
//}


names.forEach(function(name, index) {
    console.log("Running "+name+", "+index);
});


// here