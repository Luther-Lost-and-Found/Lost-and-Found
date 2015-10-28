var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require("body-parser"),
    path = require('path'),
    passport = require('passport'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
    server;

require('./config/passport')(passport); // pass passport for configuration


//============================================================================
//==========Check the If the Connection with the MySQL database is established
//============================================================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.locals.rootDir = __dirname;

require(path.join(__dirname + '/api/routes.js'))(app, passport)


var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

start(3000);

console.log('Server running');
