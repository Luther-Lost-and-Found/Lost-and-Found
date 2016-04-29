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

        var curUser = req.isAuthenticated() ? req.user : '0';

		db.query('SELECT norsekeyID, locationID, first_name, last_name, email, superPrivilege FROM AdminLF WHERE norsekeyID<>'+curUser.norsekeyID+';', function(err, rows, fields) {

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

		var user = req.body;

		db.query("SELECT * FROM AdminLF WHERE norsekeyID = ?",[user.norsekeyID], function(err, rows) {
            if (err){
                return done(err);
            }
            else {
            	var newPassword_NONHASH = makeid();
                var newPassword = bcrypt.hashSync(newPassword_NONHASH, salt);

                db.query("UPDATE AdminLF SET password = ? WHERE norsekeyID = '" + user.norsekeyID + "'",newPassword, function(err,result){
	                res.json(newPassword_NONHASH);
	            });   
            }
        });
    });

    app.post("/grantSuper", isLoggedIn, isSuper, function(req,res){

		var user = req.body;

		db.query("SELECT * FROM AdminLF WHERE norsekeyID = ?",[user.norsekeyID], function(err, rows) {
            if (err){
                return done(err);
            }
            else {

            	var currentPrivilege = parseInt(rows[0].superPrivilege);
            	var newPrivilege;
                
            	if(currentPrivilege == 0 || currentPrivilege == false){
            		newPrivilege = 1;
            	}
            	else{
            		newPrivilege = 0;
            	}

                db.query("UPDATE AdminLF SET superPrivilege = ? WHERE norsekeyID = '" + user.norsekeyID + "'",newPrivilege, function(err,result){
	            });   
            }
        });
    });

    app.delete('/deleteUser', function(req, res) {
    	var userID = Object.keys(req.query)[0];

		db.query("SELECT * FROM AdminLF WHERE norsekeyID = ?",[userID], function(err, rows) {
            if (err){
                return done(err);
            }
            if(req.user.norsekeyID == userID){
            }
            else{

                db.query("DELETE FROM AdminLF WHERE norsekeyID = '" + userID + "'", function(err,result){
		            res.json(result);
		        });   
            }
        });  
    });

    app.post("/addUser", isLoggedIn, isSuper, function(req,res){
		var user = req.body;

    	var newPassword_NONHASH = makeid();
        var newPassword = bcrypt.hashSync(newPassword_NONHASH, salt);

        var queryTEST = "INSERT INTO AdminLF (norsekeyID, password,locationID,first_name,last_name,email) VALUES ('"+
                user.norsekeyID + "','" + newPassword + "','" + user.locationID +
                "','" + user.first_name + "','" + user.last_name+"','" + user.email+"');";

        db.query(queryTEST, function(err,result){
            res.json(newPassword_NONHASH);
        });
    });
}