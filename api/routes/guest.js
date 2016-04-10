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
            console.log(req.body);

            
            db.query("select distinct LocationLF.*, \
                match (ItemLF.title) against ('"+req.body.title + "') as title_relevance, \
                match (ItemTags.tag) against ('"+req.body.description +"') as desc_relevance, \
                match (ItemLF.imagePrimColor,ItemLF.itemColor) against ('"+req.body.description +"') as color_relevance \
                from LocationLF, ItemLF, ItemTags where ItemLF.locationID = LocationLF.LocationID \
                and ItemLF.ItemID = ItemTags.ItemID and \
                (match (ItemLF.title) against ('"+req.body.title+"') or match (ItemTags.tag) against ( '"+req.body.description+"') \
                or match (ItemLF.imagePrimColor,ItemLF.itemColor) against ( '"+req.body.description+"')) \
                order by title_relevance desc, desc_relevance desc, color_relevance desc;", function(err, rows, fields){        
                    console.log(rows);
                    //console.log(auth.user.username);
                    res.json(rows);
            });
    });
};

"select distinct LocationLF.*,(ItemTags.tag) against ('blue') as tag_relevance from LocationLF, ItemLF, ItemTags where ItemLF.locationID = LocationLF.LocationID and ItemLF.ItemID = ItemTags.ItemID and match (ItemTags.tag) against ( 'blue');"


