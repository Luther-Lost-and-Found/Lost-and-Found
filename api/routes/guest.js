var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app) {
    app.get("/guestPage", function(req,res){
            console.log('i received the request');
            //var to_search = Object.keys(req.query)[0];
            //db.query("SELECT ItemLF.title, LocationLF.building_name from ItemLF, LocationLF WHERE Concat(ItemLF.title,'',ItemLF.tags) like '%" + to_search + "%'", function(err, rows, fields) {
            db.query("SELECT * from LocationLF", function(err, rows, fields){        
                    console.log(rows);
                    //console.log(auth.user.username);
                    res.json(rows);
            });
    });
};
