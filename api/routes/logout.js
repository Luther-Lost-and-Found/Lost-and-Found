var express = require('express'),
	passport = require('passport'),
	mysql = require('mysql'),
	dbconfig = require('../../config/database'),
	path = require('path'),
	db = mysql.createConnection(dbconfig.connection);
	
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {

	app.get('/signout', isLoggedIn, function(req, res) {
		req.logout();
		res.redirect('/');
                res.status(401);
	});
}
