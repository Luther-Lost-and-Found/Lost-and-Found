var express = require('express'),
	path = require('path'),
	mysql = require('mysql'),
	dbconfig = require('../../config/database'),
	db = mysql.createConnection(dbconfig.connection);
	
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn, isSuper) {

	app.get("/superAdminPage", isLoggedIn, isSuper, function(req,res){

		console.log("HI SEXY");

		db.query('SELECT norsekeyID, locationID, first_name, last_name, email, superPrivilege FROM AdminLF', function(err, rows, fields) {

            res.json(rows);
        });

    });

	console.log("HELLO FROM SUPER ADMIN");
}

