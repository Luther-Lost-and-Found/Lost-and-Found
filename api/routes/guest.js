var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app) {
    app.post("/guest", function(req,res){
            
            db.query("select distinct LocationLF.*, match (ItemLF.title) against ('"+req.body.description + "') as title_relevance, \
    LEVENSHTEIN_RATIO (ItemTags.tags, '"+req.body.description + "') >70 as desc_relevance, \
    match (ItemLF.imagePrimColor,ItemLF.itemColor) against ('"+req.body.description + "') as color_relevance \
    from LocationLF, ItemLF, ItemTags where ItemLF.locationID = LocationLF.LocationID \
    and ItemLF.ItemID = ItemTags.ItemID  and (match (ItemLF.title) against ('"+req.body.description + "') \
    or LEVENSHTEIN_RATIO (ItemTags.tags, '"+req.body.description + "') or match (ItemLF.imagePrimColor,ItemLF.itemColor) \
    against ( '"+req.body.description + "')) order by title_relevance desc, desc_relevance desc, color_relevance desc;", function(err, rows, fields){        

                    for(var i = 0; i < rows.length; i++) {
                        delete rows[i]['title_relevance'];
                        delete rows[i]['desc_relevance'];
                        delete rows[i]['color_relevance'];
                    }

                    var arr = {};

                    for ( var i=0, len=rows.length; i < len; i++ )
                        arr[rows[i]['locationID']] = rows[i];

                    rows = new Array();
                    for ( var key in arr )
                        rows.push(arr[key]);

                    res.json(rows);
            });
    });
};