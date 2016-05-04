var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    zerorpc = require("zerorpc"),

    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {

    app.post("/additem", isLoggedIn, function(req,res){

        db.query("SELECT locationID FROM AdminLF WHERE norsekeyID = '" + req.user.norsekeyID + "';",
            function(error,currentLocation){
                db.query("INSERT INTO ItemLF (title,locationID,accepted_by,itemColor,time_stamp) VALUES ('"+
                req.body.title + "'," + currentLocation[0].locationID + ",'" + req.user.norsekeyID +
                "','" + req.body.itemColor + "',CURDATE());",function(err,result){

                    var fullTag = "";

                    for (var i = 0; i < req.body.newTags.length; i++) {
                        fullTag = fullTag+req.body.newTags[i]+"@@@";
                        
                    }

                    fullTag = fullTag.substring(0, fullTag.length - 3);

                    db.query("INSERT INTO ItemTags (itemID,tags) VALUES (" +
                        result.insertId + ",'" + fullTag + "');",function(err){

                    });
                    res.json(result);
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
            var destPath = '/home/sparrow/CS/cs490/Colab';
            var headers = {
                'x-amz-acl': 'public-read',
                'Content-Length': file.size,
                'Content-Type': contentType
            };

            var primaryKey = file.originalFilename;
            primaryKey = primaryKey.replace(extension,'');

            // Convoluted piece responsible for executing things in the correct order

            var picStream = fs.createWriteStream("public/itemImages/" + file.originalFilename);
            picStream.on('close', function() {
                client.invoke("final_result", file.originalFilename, function(error, res, more) {
                    db.query("UPDATE ItemLF SET imagePrimColor = '"+res[0]+"', imageSecColor = '"+res[1]+"', imageThirdColor = '"+res[2]+"' WHERE itemID = " + primaryKey, function(err,result){
                    console.log(res);
                    });
                });
            });
            fs.createReadStream(file.path).pipe(picStream); 
        });
    });
};
