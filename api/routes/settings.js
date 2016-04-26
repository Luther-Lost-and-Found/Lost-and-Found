var express = require('express'),
path = require('path'),
mysql = require('mysql'),
multiparty = require('multiparty'),
dbconfig = require('../../config/database'),
db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {
    app.post("/saveSettings", isLoggedIn, function(req,res){
        db.query("UPDATE AdminLF SET allItems="+req.body.allItems+", sorting='"+req.body.sorting+"', gridSize="+req.body.gridSize+" WHERE norseKeyID='" + req.user.norsekeyID + "'", function(err,result){

        });
        res.json("success");
    });

    app.get("/getSettings", isLoggedIn, function(req,res){
        db.query("SELECT allItems, sorting, gridSize FROM AdminLF WHERE norsekeyID="+req.user.norsekeyID+";", function(err,rows,fields){

            res.json(rows);
        });
    });
};