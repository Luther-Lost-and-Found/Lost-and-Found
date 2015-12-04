var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {
    app.get("/searchItem", isLoggedIn, function(req,res){
        var to_search = Object.keys(req.query)[0];
        db.query("SELECT * from ItemLF WHERE Concat(title) like '%" + to_search + "%'", function(err, result) {
                res.json(result);
        });

    });
};
