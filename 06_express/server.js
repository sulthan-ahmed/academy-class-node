// imports
var express      = require("express");
var path         = require("path");
var mongojs      = require("mongojs");
var session      = require("express-session");
var cookieParser = require("cookie-parser");

// routes
var blogs        = require("./routes/blogs");

// setup router and server
var app = express();

// setup for sessions and cookies
app.use(cookieParser());
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}));

// setup render engine
app.set('view engine', 'jade');

// routes and middleware
app.use(function(req, res, next) {
    console.log("Incoming request: "+req.originalUrl);
    next();
});

app.use("/index.html", function(req, res) {
    console.log(req.session);
    req.session.info = "HI";
    res.render("home", {
        pageTitle: "Welcome to blogger pro"
    });
});

// Blog routes
function getDB() {
    return mongojs("webapps", ["blogs"]);
}

app.use("/view_blogs/:id", function(req, res){
    getDB().blogs.find({_id: mongojs.ObjectId(req.params.id)}, function(err, docs){
        res.render("blog_details", {
            pageTitle: "View Blog Details",
            blog: docs[0]
        });
    });
});

app.use("/view_blogs", function(req, res){
    getDB().blogs.find(function(err, docs){
        res.render("blogs", {
            pageTitle: "Current Blogs",
            blogs: docs
        });
    });
});



// Send to blogs route for APIs
app.use("/blogs", blogs);

// client side frameworks [DEV ONLY]
app.use("/jquery", express.static(path.join(__dirname, "bower_components/jquery/dist")) )

// Static route for client side files
app.use( express.static( path.join(__dirname, "public") ) );

app.use("*", function (req, res) {
    res.status(404).send("<h1>Server Error</h1><p>404 File Not Found</p>");
});

// start server
app.listen(3000, function() {
    console.log("Server running on http://localhost:3000");
});