var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app) {
    app.post("/guest", function(req,res){
            console.log('i received the request');
            //info in req.body

            
            db.query("select LocationLF.*, match (ItemLF.title) against ('"+req.body.title+"') as title_relevance, \
                    match (ItemLF.tags) against ('"+req.body.description+"') as desc_relevance \
                    from LocationLF, ItemLF where ItemLF.locationID = LocationLF.locationID and \
                    (match (ItemLF.title) against ('" + req.body.title + "') or \
                    match (ItemLF.tags) against ('" + req.body.description + "'))\
                    order by title_relevance desc, desc_relevance desc;", function(err, rows, fields){        
                    console.log(rows);
                    //console.log(auth.user.username);
                    res.json(rows);
            });
    });
};
