var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {
    app.get("/itemlist", isLoggedIn, function(req,res){
            console.log('i received the request');

            db.query('SELECT * from ItemLF', function(err, rows, fields) {
                    
                    console.log(rows);
                    res.json(rows);

            });

    });

    app.post("/itemlist", function(req,res){
            console.log(req.body);

            db.query('INSERT INTO ItemLF SET ?', req.body, function(err,result){

                    res.json(result);

            });
    });

    app.delete('/itemlist/', function(req, res) {
            var to_delete = Object.keys(req.query)[0];
            console.log(typeof(to_delete));
            db.query("DELETE FROM ItemLF WHERE itemID = '" + to_delete + "'", function(err,result){
                    res.json(result);
            });
    });

    app.get('/itemlist/:id', function(req, res) {
            var to_edit = req.params["id"];
            db.query("SELECT * FROM ItemLF WHERE itemID = '" + to_edit + "'", function(err,result){
                    res.json(result);
            });
            console.log(to_edit);
    });

    app.put('/itemlist/:id',function(req,res){
            var to_update = req.params["id"];
            console.log(req.body.itemID);
            db.query("UPDATE ItemLF SET ? WHERE itemID = '" + to_update + "'", req.body, function(err,result){
                    res.json(result);
            });
    });

};
