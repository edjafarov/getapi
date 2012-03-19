#!/usr/bin/env node

var argv = require('optimist').argv;
var express = require('express');
var getapi = require('getapi');

var app = express.createServer();

var app = express.createServer(
  express.favicon()
);

app.configure(function() {
	getapi.init(app, argv.dir||"./"); // initialize routes for API's
});

app.listen(argv.port||80);

console.log("API started on " + (argv.port||80) + " port");