var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport, isLoggedIn) {
    app.get("/searchItem", isLoggedIn, function(req,res){
        var to_search = Object.keys(req.query)[0];

        db.query("select distinct ItemLF.*, \
                match (ItemLF.title) against ('"+to_search + "') as title_relevance, \
                match (ItemTags.tag) against ('"+to_search +"') as desc_relevance, \
                match (ItemLF.imagePrimColor,ItemLF.itemColor) against ('"+to_search + "') as color_relevance \
                from LocationLF, ItemLF, ItemTags where ItemLF.locationID = LocationLF.LocationID \
                and ItemLF.ItemID = ItemTags.ItemID and \
                (match (ItemLF.title) against ('"+to_search+"') or match (ItemTags.tag) against ( '"+to_search+"') \
                or match (ItemLF.imagePrimColor,ItemLF.itemColor) against ( '"+to_search+"')) \
                order by title_relevance desc, desc_relevance desc, color_relevance desc;", function(err, rows, fields){  

                    for (i = 0; i < rows.length; i++) { 
                        if(rows[i].imagePrimColor == null){
                            rows[i].currentImage = '../itemImages/'+ rows[i].itemColor + '.jpg';
                        }
                        else{
                            rows[i].currentImage = '../itemImages/' + rows[i].itemID + '.jpg';
                        }
                    }      
                    console.log(rows);
                    //console.log(auth.user.username);
                    res.json(rows);
            });

    });
};
