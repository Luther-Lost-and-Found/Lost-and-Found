//======================================================
//=======use "service mysql start" to start the database
//======================================================

var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require("body-parser"),
    path = require('path'),
    server;

var db = mysql.createConnection({
  host     : 'localhost',
  port		: '3306',
  user     : 'senior',
  password : 'qwerty',
  database : 'lost'
});

//============================================================================
//==========Check the If the Connection with the MySQL database is established
//============================================================================

db.connect(function(err){
if(!err) {
	console.log("Database is connected ... \n\n");  
} else {
	console.log("Error connecting database ... \n\n");  
}
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.locals.rootDir = __dirname;
require(path.join(__dirname + '/api/routes'))(app, db)

var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

start(3000);

console.log('Server running');
