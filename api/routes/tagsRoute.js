var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app) {

    app.get("/tags", function(req,res){

        db.query('Select * from Tags', req.body, function(err, rows, fields){
                res.json(rows);
        });
    });
};