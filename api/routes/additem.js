var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {

    app.post("/additem", isLoggedIn, function(req,res){

        db.query("SELECT locationID FROM AdminLF WHERE norsekeyID = '" + req.user.norsekeyID + "';",
            function(error,currentLocation){

                db.query("INSERT INTO ItemLF (title,locationID,accepted_by,claimed,time_stamp) VALUES ('"+
                req.body.title + "'," + currentLocation[0].locationID + ",'" + req.user.norsekeyID +
                "','False'," + "CURDATE());",function(err,result){

                    for (var i = 0; i < req.body.newTags.length; i++) {
                        var newTag = req.body.newTags[i].lowername;
                        db.query("INSERT INTO ItemTags (itemID,tag) VALUES (" +
                        result.insertId + ",'" + newTag + "');",function(err){

                        });
                    }     
                    res.json(result);
            });
        });
    });
};
