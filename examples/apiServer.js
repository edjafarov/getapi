var express = require('express');
var getapi = require('../src/getapi.js');

var app = express.createServer();

var app = express.createServer(
   express.static(__dirname + "/public")
  , express.favicon()
);

app.configure(function() {
    app.set('views', __dirname + "/");
    app.set('view engine', 'ejs');
});

// initialize routes for API's
getapi.init(app, "./apis");

app.get("/",function(req, res){
	res.render('public/homepage.ejs');
});

app.listen(3000);