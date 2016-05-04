var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {
    app.get("/itemlist", isLoggedIn, function(req,res){

            db.query('SELECT *, CONVERT(tags USING utf8) as convTags, building_name, room_name from ItemLF, ItemTags, LocationLF where ItemLF.itemID = ItemTags.itemID AND ItemLF.locationID = LocationLF.locationID;', function(err, rows, fields) {


                for (i = 0; i < rows.length; i++) { 
                    if(rows[i].imagePrimColor == null){
                        rows[i].currentImage = '../itemImages/'+ rows[i].itemColor + '.jpg';
                    }
                    else{
                        rows[i].currentImage = '../itemImages/' + rows[i].itemID + '.jpg';
                    }

                    rows[i].tags = (rows[i].convTags).split("@@@");
                }

                var ua = req.headers['user-agent'].toLowerCase();
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))) {
                    // res.writeHead(302, {Location: 'http://detectmobilebrowser.com/mobile'});

                    console.log("mobile detected");
                    rows.mobile = true;
                    res.json(rows);
                }
                else{
                    console.log("mobile not detected");
                    req.mobile = false;
                    res.json(rows);
                }
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

                res.json(rows);
            });

    });

    app.get("/itemlist/locationsAll", isLoggedIn, function(req,res){

        db.query('SELECT building_name, locationID from LocationLF ORDER BY building_name ASC', function(err, rows, fields) {

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

                res.json(rows);

            });
    });

    app.put('/itemlist/', function(req, res) {
        var to_send = Object.keys(req.query)[0];
        db.query("SELECT locationID FROM LocationLF WHERE building_name = '" + req.body.location + "';",
        function(error,locationID){

            db.query("UPDATE ItemLF SET ? WHERE itemID = '" + to_send + "'",locationID[0], function(err,result){
                res.json(result);

            });
        });
    });

    app.put('/itemlist/:id',function(req,res){
        var to_update = req.params["id"];
        var tags = req.body.tags;
        var fullTag = {"tags": tags.join("@@@")};
        delete req.body["currentImage"];
        delete req.body["tags"];
        delete req.body["newTags"];
        delete req.body["convTags"];
        console.log("BLOOOOOOOOOOOOOOOOOOODY REQ.BOOOOOOOODY",req.body)
        db.query("UPDATE ItemLF SET title = '"+req.body.title+"' WHERE itemID = '" + to_update + "'", function(err,result){
            db.query("UPDATE ItemTags SET ? WHERE itemID = '" + to_update + "'",  fullTag,function(err){

            });

            res.json(result);
        });
    });

};