var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {
    app.put("/searchItem", function(req,res){
        console.log('hello from search route');
        console.log(req.body.title);

        db.query("SELECT * from ItemLF WHERE Concat(title,'',tags) like '%" + req.body.title + "%'", function(err, result) {
                console.log(result);  
                res.json(result);
        });

    });
};
