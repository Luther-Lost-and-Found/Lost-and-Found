var express = require('express'),
	bcrypt = require('bcrypt-nodejs'),
	path = require('path'),
	mysql = require('mysql'),
	dbconfig = require('../../config/database'),
	db = mysql.createConnection(dbconfig.connection),
    salt = bcrypt.genSaltSync(10);
	
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn, isSuper) {

	app.get("/superAdminPage", isLoggedIn, isSuper, function(req,res){

		console.log("HI SEXY");

		db.query('SELECT norsekeyID, locationID, first_name, last_name, email, superPrivilege FROM AdminLF', function(err, rows, fields) {

            res.json(rows);
        });

    });

    function makeid(){
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

    app.post("/resetPassword", isLoggedIn, isSuper, function(req,res){

		console.log("CHANGING PASSWORD", req.body);
		var user = req.body;

		console.log(makeid());

		db.query("SELECT * FROM AdminLF WHERE norsekeyID = ?",[user.norsekeyID], function(err, rows) {
            if (err){
                return done(err);
            }
            else {
            	var newPassword_NONHASH = makeid();
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

    app.post("/grantSuper", isLoggedIn, isSuper, function(req,res){

		console.log("GRANTING SUPER", req.body);
		var user = req.body;

		db.query("SELECT * FROM AdminLF WHERE norsekeyID = ?",[user.norsekeyID], function(err, rows) {
            if (err){
                return done(err);
            }
            else {

            	var currentPrivilege = parseInt(user.superPrivilege);
            	var newPrivilege;

            	if(currentPrivilege == 0){
            		newPrivilege = 1;
            	}
            	else{
            		newPrivilege = 0;
            	}

                db.query("UPDATE AdminLF SET superPrivilege = ? WHERE norsekeyID = '" + user.norsekeyID + "'",newPrivilege, function(err,result){
	                console.log("PASSWORD CHANGED",result);
	            });   
            }
        });
    });

    app.delete('/deleteUser', function(req, res) {
    	var userID = Object.keys(req.query)[0];
        console.log("DELETING SUPER",userID);

		db.query("SELECT * FROM AdminLF WHERE norsekeyID = ?",[userID], function(err, rows) {
            if (err){
                return done(err);
            }
            else{

                db.query("DELETE FROM AdminLF WHERE norsekeyID = '" + userID + "'", function(err,result){
		            res.json(result);
		        });   
            }
        });  
    });

    app.post("/addUser", isLoggedIn, isSuper, function(req,res){

		console.log("ADDING USER", req.body);
		var user = req.body;

		console.log(makeid());

    	var newPassword_NONHASH = makeid();
        var newPassword = bcrypt.hashSync(newPassword_NONHASH, salt);
        console.log("HASHED PASSWORD", newPassword);

        db.query("INSERT INTO ItemLF (norsekeyID, password,locationID,first_name,last_name,email) VALUES ('"+
                user.norsekeyID + "'," + newPassword + ",'" + user.locationID +
                "','" + user.first_name + "','" + user.last_name+"','" + user.email+");", function(err,result){
		            console.log("NEW USER CREATED",result);
		            res.json(newPassword_NONHASH);
        });
    });
}