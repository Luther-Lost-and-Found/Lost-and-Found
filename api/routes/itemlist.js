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
                    
                for (i = 0; i < rows.length; i++) { 
                    if(rows[i].imagePrimColor == null){
                        rows[i].currentImage = '../itemImages/'+ rows[i].itemColor + '.jpg';
                    }
                    else{
                        rows[i].currentImage = '../itemImages/' + rows[i].itemID + '.jpg';
                    }
                }

                //console.log(auth.user.username);
                res.json(rows);
            });

    });

    app.delete('/itemlist/', function(req, res) {
            var to_delete = Object.keys(req.query)[0];
            db.query("DELETE FROM ItemLF WHERE itemID = '" + to_delete + "'", function(err,result){
                    res.json(result);
            });
    });

    app.get('/itemlist/:id', function(req, res) {
            var to_edit = req.params["id"];
            db.query("SELECT * FROM ItemTags,ItemLF WHERE ItemLF.itemID = ItemTags.itemID and ItemTags.itemID = '" + to_edit + "'", function(err,result){
                
                for (i = 0; i < result.length; i++) { 
                    if(result[i].imagePrimColor == null){
                        result[i].currentImage = '../itemImages/'+ result[i].itemColor + '.jpg';
                    }
                    else{
                        result[i].currentImage = '../itemImages/' + result[i].itemID + '.jpg';
                    }
                }

                res.json(result);
            });
    });

    app.put('/itemlist/:id',function(req,res){
            var to_update = req.params["id"];
            console.log(req.body.itemID);
            db.query("UPDATE ItemLF SET ? WHERE itemID = '" + to_update + "'", req.body, function(err,result){
                    res.json(result);
            });
    });

};
