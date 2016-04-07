var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {
    app.get("*", isLoggedIn, function(req,res){
        console.log("404 happens");
    });
};
