var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    zerorpc = require("zerorpc"),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

    app.post("/additem", function(req,res){

        db.query("SELECT locationID FROM AdminLF WHERE norsekeyID = '" + req.user.norsekeyID + "';",
            function(error,currentLocation){
                console.log(req.user.norsekeyID);
                console.log(currentLocation[0].locationID);

                db.query("INSERT INTO ItemLF (title,tags,locationID,accepted_by,claimed) VALUES ('"+
                req.body.title + "','" + req.body.tags + "'," + currentLocation[0].locationID + ",'" + req.user.norsekeyID +
                "','False');",function(err,result){
                
                    db.query('SELECT LAST_INSERT_ID() AS max;',function(error,resultOfSelect){
                        console.log(resultOfSelect[0].max);
                        res.json(resultOfSelect[0].max);
                    });
            });
        });
    });

    app.post('/additem/uploadImage', function(req, res) {

        var client = new zerorpc.Client();
        client.connect("tcp://127.0.0.1:4242");

        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var file = files.file[0];
            var contentType = file.headers['content-type'];
            var extension = file.path.substring(file.path.lastIndexOf('.'));
            var destPath = '/home/sparrow/CS/cs490/test';

            var headers = {
                'x-amz-acl': 'public-read',
                'Content-Length': file.size,
                'Content-Type': contentType
            };

            var primaryKey = file.originalFilename;
            primaryKey = primaryKey.replace(extension,'');
            console.log("primary key");
            console.log(extension);
            console.log(primaryKey);
            console.log(file.originalFilename);

            // Convoluted piece that is responsible for executing things in the correct order

            var picStream = fs.createWriteStream("itemImages/" + file.originalFilename);
            picStream.on('close', function() {
                client.invoke("final_result", file.originalFilename, function(error, res, more) {
                    console.log(res);
                    db.query("UPDATE ItemLF SET imagePrimColor = ? WHERE itemID = " + primaryKey, res, function(err,result){
                        console.log("colors written");
                    });
                });
                console.log('file done');
            });
            fs.createReadStream(file.path).pipe(picStream); 



            console.log('uploaded');
        });
    });

};
