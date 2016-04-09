var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../../config/database'),
    db = mysql.createConnection(dbconfig.connection);
// var level = require('level-js');
    
db.query('USE ' + dbconfig.database);

// var searchIndex = require('search-index')

// var dataset = {
//     pages: ["usa"]
//   };

// searchIndex({indexPath:'reutersindex', db: level}, function(err, si) {
//   si.add(dataset, {'batchName': 'reuters'}, function (err) {
//     //add stuff to index
//   });

//   var q = {};
//     q.query = {'*': ['usa']};

//   si.search(q, function (err, searchResults) {
//     //search in index
//     console.log(searchResults);
//   });
// });

module.exports = function(app) {
    app.post("/guest", function(req,res){
            console.log('i received the request');
            //info in req.body
            console.log("I RECEIVED",req.body);
            
            db.query("select distinct LocationLF.*, match (ItemLF.title) against ('"+req.body.description + "') as title_relevance, \
    LEVENSHTEIN_RATIO (ItemTags.tags, '"+req.body.description + "') as desc_relevance, \
    match (ItemLF.imagePrimColor,ItemLF.itemColor) against ('"+req.body.description + "') as color_relevance \
    from LocationLF, ItemLF, ItemTags where ItemLF.locationID = LocationLF.LocationID \
    and ItemLF.ItemID = ItemTags.ItemID  and (match (ItemLF.title) against ('"+req.body.description + "') \
    or LEVENSHTEIN (ItemTags.tags, '"+req.body.description + "') or match (ItemLF.imagePrimColor,ItemLF.itemColor) \
    against ( '"+req.body.description + "')) order by title_relevance desc, desc_relevance desc, color_relevance desc;", function(err, rows, fields){        
                    console.log(rows);
                    //console.log(auth.user.username);
                    res.json(rows);
            });
    });
};


// /*"select LocationLF.*, match (ItemLF.title) against ('"+req.body.title+"') as title_relevance, \
//                     match (ItemLF.tags) against ('"+req.body.description+"') as desc_relevance \
//                     from LocationLF, ItemLF where ItemLF.locationID = LocationLF.locationID and \
//                     (match (ItemLF.title) against ('" + req.body.title + "') or \
//                     match (ItemLF.tags) against ('" + req.body.description + "'))\
//                     order by title_relevance desc, desc_relevance desc;"*/


// /*select distinct LocationLF.*, match (ItemLF.title) against ('"+req.body.description + "') as title_relevance,\
//     LEVENSHTEIN_RATIO (ItemTags.tags, '"+req.body.description + "') as desc_relevance,\
//     match (ItemLF.imagePrimColor,ItemLF.itemColor) against ('"+req.body.description + "') as color_relevance\
//     from LocationLF, ItemLF, ItemTags where ItemLF.locationID = LocationLF.LocationID\
//     and ItemLF.ItemID = ItemTags.ItemID  and (match (ItemLF.title) against ('"+req.body.description + "')\
//     or LEVENSHTEIN (ItemTags.tags, '"+req.body.description + "') or match (ItemLF.imagePrimColor,ItemLF.itemColor)\
//     against ( '"+req.body.description + "')) order by title_relevance desc, desc_relevance desc, color_relevance desc;