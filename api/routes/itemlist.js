var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {
    app.get("/itemlist", isLoggedIn, function(req,res){


            db.query('SELECT *, CONVERT(tags USING utf8) as convTags from ItemLF, ItemTags where ItemLF.itemID = ItemTags.itemID;', function(err, rows, fields) {

                for (i = 0; i < rows.length; i++) { 
                    if(rows[i].imagePrimColor == null){
                        rows[i].currentImage = '../itemImages/'+ rows[i].itemColor + '.jpg';
                    }
                    else{
                        rows[i].currentImage = '../itemImages/' + rows[i].itemID + '.jpg';
                    }

                    rows[i].tags = (rows[i].convTags).split("@@@");

                }

                //console.log(auth.user.username);
                res.json(rows);
            });

    });

    app.get("/itemlist/alpha", isLoggedIn, function(req,res){

            db.query('SELECT * from ItemLF ORDER BY title ASC', function(err, rows, fields) {
                    
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

    app.get("/itemlist/location", isLoggedIn, function(req,res){

            db.query('SELECT * from ItemLF ORDER BY locationID ASC', function(err, rows, fields) {
                    
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

    app.get("/itemlist/date", isLoggedIn, function(req,res){

            db.query('SELECT * from ItemLF ORDER BY time_stamp ASC', function(err, rows, fields) {
                    
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

            db.query("SELECT *, CONVERT(tags USING utf8) as convTags from ItemLF, ItemTags where ItemLF.itemID = ItemTags.itemID and ItemTags.itemID = '" + to_edit + "'", function(err, rows, fields) {

                for (i = 0; i < rows.length; i++) { 
                    if(rows[i].imagePrimColor == null){
                        rows[i].currentImage = '../itemImages/'+ rows[i].itemColor + '.jpg';
                    }
                    else{
                        rows[i].currentImage = '../itemImages/' + rows[i].itemID + '.jpg';
                    }
                    rows[i].tags = (rows[i].convTags).split("@@@");
                }

                //console.log(auth.user.username);
                res.json(rows);

            });
    });

    app.put('/itemlist/:id',function(req,res){
            var to_update = req.params["id"];
            var tags = req.body.newTags;
            delete req.body["currentImage"];
            delete req.body["tag"];
            delete req.body["newTags"];
            console.log(req.body);
            console.log(tags);
            db.query("UPDATE ItemLF SET ? WHERE itemID = '" + to_update + "'", req.body, function(err,result){
                    
                for (var i = 0; i < tags.length; i++) {
                    var newTag = tags[i].name;
                    console.log(newTag);
                    db.query("INSERT INTO ItemTags (itemID,tag) VALUES (" +
                    to_update + ",'" + newTag + "');",function(err){

                    });
                }

                res.json(result);
            });
    });

};
