var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

    app.post("/additem", function(req,res){

        db.query("SELECT locationID FROM AdminLF WHERE norsekeyID = '" + req.user.norsekeyID + "';",
            function(error,currentLocation){
                console.log(req.user.norsekeyID);
                console.log(currentLocation[0].locationID);

                db.query("INSERT INTO ItemLF (title,tags,locationID,accepted_by,claimed) VALUES ('"+
                req.body.title + "','" + req.body.tags + "'," + currentLocation[0].locationID + ",'" + req.user.norsekeyID +
                "','False');",function(err,result){
                
                    res.json(result);
            });
        });
    });

};
