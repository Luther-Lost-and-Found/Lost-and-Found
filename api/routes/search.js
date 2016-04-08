var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    SphinxClient = require ("sphinxapi"),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
// db.query('USE ' + dbconfig.database);

var connection = mysql.createConnection(
    {
        localAddress      : '127.0.0.1',
        port      : '3306',
        user: 'senior',
        password: 'qwerty',
        database: 'lost'
    }
);

module.exports = function(app, passport, isLoggedIn) {
    app.get("/searchItem", isLoggedIn, function(req,res){
        console.log('hello from search route');
        var to_search = Object.keys(req.query)[0];
        db.query("SELECT * from ItemLF WHERE Concat(title,'',tags) like '%" + to_search + "%'", function(err, result) {
                res.json(result);
        });

    });
};
