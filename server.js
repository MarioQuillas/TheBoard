//var http = require('http');
//var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);

var http = require("http");
var express = require("express");
var app = express();
//var ejsEngine = require("ejs-locals");

var controllers = require("./controllers");
var flash = require("connect-flash");
var session = require("express-session");
var cookieParser = require('cookie-parser');

// setup view engine
//app.set("view engine", "jade");

//app.engine("ejs", ejsEngine); // support master pages
//app.set("view engine", "ejs"); // ejs view engines

app.set("view engine", "vash");

//Opt into services
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(
{
    secret: "TheBoardTraining"
}));
app.use(flash());

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// use authentification
var auth = require("./auth")
auth.init(app);

// Map the routes
controllers.init(app);

//app.get("/",
//    function (req, res) {
//        ////control http headers
//        //res.set("Content-Type", "application/json");

//        //res.send("<html><body><h1>Express</h1></body></html>");

//        //res.render("jade/index", { title: "express + jade" });

//        //res.render("ejs/index", { title: "express + ejs" });

//        res.render("index", { title: "express + vash" });
//    });

app.get("/api/users",
    function(req, res) {
        res.send({ name: "Shawn", isValid: true, group: "Admin" });
    });

//app.get("api/sql",
//    function(req, res) {
//        var msnodesql = require("msnodesql");
//        var connString = "";

//        msnodesql.query(connString,
//            "SELECT * FROM ...",
//            function(err, results) {
//                // error handling
//                res.send(results);
//            });
//    });

 

var server = http.createServer(app);

server.listen(3000);

