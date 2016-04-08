var express = require('express'),
path = require('path'),
mysql = require('mysql'),
multiparty = require('multiparty'),
dbconfig = require('../../config/database'),
db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {

    app.post("/saveSettings", isLoggedIn, function(req,res){

        console.log(req.body);

        // db.query("SELECT locationID FROM AdminLF WHERE norsekeyID = '" + req.user.norsekeyID + "';",
        //     function(error,currentLocation){

        //         db.query("INSERT INTO ItemLF (title,locationID,accepted_by,itemColor,time_stamp) VALUES ('"+
        //         req.body.title + "'," + currentLocation[0].locationID + ",'" + req.user.norsekeyID +
        //         "','" + req.body.itemColor + "',CURDATE());",function(err,result){

                    
        //     });
        // });
    });
};
