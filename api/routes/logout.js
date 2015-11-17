var express = require('express'),
	passport = require('passport'),
	mysql = require('mysql'),
	dbconfig = require('../../config/database'),
	path = require('path'),
	db = mysql.createConnection(dbconfig.connection);
	
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

	app.get('/signout', function(req, res) {
		console.log("hello from the navBar router");
		req.logout();
		res.redirect('/');
                res.status(401);
	});
}
