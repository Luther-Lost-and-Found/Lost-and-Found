var express = require('express'),
	bcrypt = require('bcrypt-nodejs'),
	path = require('path'),
	mysql = require('mysql'),
	dbconfig = require('../../config/database'),
	db = mysql.createConnection(dbconfig.connection),
    salt = bcrypt.genSaltSync(10);
	
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {

    app.get("/getInfo", isLoggedIn, function(req,res){

        console.log("HI SEXY", req.body);
        res.json(req.body)
    });

	app.get("/changePasswordPage", isLoggedIn, function(req,res){

		console.log("HI SEXY");

		db.query('SELECT norsekeyID, locationID, first_name, last_name, email, superPrivilege FROM AdminLF', function(err, rows, fields) {

            res.json(rows);
        });

    });

    app.post("/changePassword", isLoggedIn, function(req,res){

		console.log("CHANGING PASSWORD", req.body);
		var user = req.body;

		db.query("SELECT * FROM AdminLF WHERE password = ?",[user.oldPass], function(err, rows) {
            if (err){
                return done(err);
            }
            else {
            	var newPassword_NONHASH = user.newPass;
                var newPassword = bcrypt.hashSync(newPassword_NONHASH, salt);
                console.log("HASHED PASSWORD", newPassword);

                // var insertQuery = "INSERT INTO AdminLF ( username, password ) values (?,?)";

                db.query("UPDATE AdminLF SET password = ? WHERE norsekeyID = '" + user.norsekeyID + "'",newPassword, function(err,result){
	                console.log("PASSWORD CHANGED",result);
	                res.json(newPassword_NONHASH);
	            });   
            }
        });
    });
}