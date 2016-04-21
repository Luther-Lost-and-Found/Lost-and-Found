var express = require('express'),
	passport = require('passport'),
	mysql = require('mysql'),
	dbconfig = require('../../config/database'),
	path = require('path'),
	db = mysql.createConnection(dbconfig.connection);
	
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

	app.use(express.static(path.join(__dirname, '/views')));

	app.get('/login', function(req, res) {
		res.sendFile(path.join(app.locals.rootDir + '/public/partials/login/login.html')); // load the index.ejs file
	});

	app.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.send(req.user);
	});

	var auth = function(req, res, next){
		if (!req.isAuthenticated()){

			res.send(401);
		} 
		else next();
	};
}

