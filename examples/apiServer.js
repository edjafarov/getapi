var express = require('express');
var getapi = require('getapi');

var app = express.createServer();

var app = express.createServer(
  express.favicon()
);

app.configure(function() {
	getapi.init(app,"./apis")// initialize routes for API's
    app.set('views', __dirname + "/");
    app.set('view engine', 'ejs');
});

app.get("/",function(req, res){
	res.render('public/homepage.ejs');
});

app.listen(3000);