var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app) {
    app.get("/guestPage", function(req,res){
            console.log('i received the request');

            db.query('SELECT * from ItemLF', function(err, rows, fields) {
                    
                    console.log(rows);
                    //console.log(auth.user.username);
                    res.json(rows);
            });
    });
};
