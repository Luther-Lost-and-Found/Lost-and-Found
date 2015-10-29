var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {
    app.get("/searchItem", function(req,res){
        console.log('hello from search route');
        var to_search = Object.keys(req.query)[0];
        db.query("SELECT * from ItemLF WHERE Concat(title,'',tags) like '%" + to_search + "%'", function(err, result) {
                res.json(result);
        });

    });
};
