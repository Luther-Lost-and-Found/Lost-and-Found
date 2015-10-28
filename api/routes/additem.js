var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

    app.post("/additem", function(req,res){
        console.log(req.body);

        db.query('INSERT INTO ItemLF SET ?', req.body, function(err,result){

                res.json(result);
        });
    });

};
