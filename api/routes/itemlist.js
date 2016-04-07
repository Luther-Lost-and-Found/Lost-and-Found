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

    app.get("/itemlist/locationsAll", isLoggedIn, function(req,res){

        db.query('SELECT building_name from LocationLF ORDER BY building_name ASC', function(err, rows, fields) {
            // console.log("ALL LOCATIONS: ", rows);
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

    app.put('/itemlist/', function(req, res) {
        console.log(req.body.location);
        var to_send = Object.keys(req.query)[0];
        console.log("HELLO FROM LOCATION:",to_send);
        db.query("SELECT locationID FROM LocationLF WHERE building_name = '" + req.body.location + "';",
        function(error,locationID){
            console.log("LOCATION ID IS: ", locationID);

            db.query("UPDATE ItemLF SET ? WHERE itemID = '" + to_send + "'",locationID[0], function(err,result){
                res.json(result);

            });
        });
    });

    app.put('/itemlist/:id',function(req,res){
        var to_update = req.params["id"];
        var tags = req.body.tags;
        var fullTag = {"tags": tags.join("@@@")};
        console.log("UPDATING ITEMS:+++++++++========++++++++++ ", req.body);
        delete req.body["currentImage"];
        delete req.body["tags"];
        delete req.body["newTags"];
        delete req.body["convTags"];
        db.query("UPDATE ItemLF SET ? WHERE itemID = '" + to_update + "'", req.body, function(err,result){
            console.log("UPDATING TAGS::::::::", to_update, ":::::",fullTag);    
            db.query("UPDATE ItemTags SET ? WHERE itemID = '" + to_update + "'",  fullTag,function(err){

            });

            res.json(result);
        });
    });

};
