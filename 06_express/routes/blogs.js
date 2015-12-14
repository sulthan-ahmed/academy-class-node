// Blogs API Route

var router      = require("express").Router();
var bodyParser  = require("body-parser");
var mongojs     = require("mongojs");

function getDB() {
    return mongojs("webapps", ["blogs"]);
}


router.get("/", function(req, res) {
    var db = getDB();
   db.blogs.find(function(err, docs) {
       if (err) {
           res.status(500).send("DB Error");
       } else {
           res.json(docs);
       }
   });
});

router.get("/:id", function(req, res) {
    var db = getDB();
    db.blogs.find({ _id: db.ObjectId(req.params.id) }, function(err, docs) {
        if (err) {
            res.status(500).send("DB Error");
        } else {
            res.json(docs);
        }
    });
});

router.delete("/:id", function(req, res) {
    var db = getDB();
    db.blogs.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err) {

        if (err) {
            res.status(500).send("DB Error");
        } else {
            res.send();
        }

    });
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", function(req, res) {
    if (typeof req.body.title != "string"
        || typeof req.body.message != "string") {
        res.status(500).send("Missing data from post");
    } else {

        getDB().blogs.insert({
            title: req.body.title,
            message: req.body.message
        });

        res.send();
    }
});

router.put("/:id", function(req, res){
    var info = {};
    for( var prop in req.body) {
        if (req.body.hasOwnProperty(prop)) {
            if (
                (prop == "title"
                    || prop == "message")
                && typeof req.body[prop] == "string"
            ) {
                info[prop] = req.body[prop];
            }
        }
    }
    getDB().blogs.update({ _id: mongojs.ObjectId(req.params.id) }, info);
    res.send();
});

// export router
module.exports = router;