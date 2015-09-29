//======================================================
//=======use "service mysql start" to start the database
//======================================================

var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");


var db = mysql.createConnection({
  host     : 'localhost',
  port		: '3306',
  user     : 'senior',
  password : 'qwerty',
  database : 'lost'
});

//============================================================================
//==========Check the If the Connection with the MySQL database is established
//============================================================================

db.connect(function(err){
if(!err) {
	console.log("Database is connected ... \n\n");  
} else {
	console.log("Error connecting database ... \n\n");  
}
});

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

//============================================
//========Pulling data from the MySQL Database
//============================================

app.get("/itemlist",function(req,res){
	console.log('i received the request');

	db.query('SELECT * from ItemLF', function(err, rows, fields) {
		
		console.log(rows);
		res.json(rows);

	});

});

app.post("/itemlist", function(req,res){
	console.log(req.body);

	db.query('INSERT INTO ItemLF SET ?', req.body, function(err,result){

		res.json(result);

	});
});

app.delete('/itemlist/', function(req, res) {
	var to_delete = Object.keys(req.query)[0];
	console.log(typeof(to_delete));
	db.query("DELETE FROM ItemLF WHERE itemID = '" + to_delete + "'", function(err,result){
		res.json(result);
	});
});

app.get('/itemlist/:id', function(req, res) {
	var to_edit = req.params["id"];
	db.query("SELECT * FROM ItemLF WHERE itemID = '" + to_edit + "'", function(err,result){
		res.json(result);
	});
	console.log(to_edit);
});

app.put('/itemlist/:id',function(req,res){
	var to_update = req.params["id"];
	console.log(req.body.itemID);
	db.query("UPDATE ItemLF SET ? WHERE itemID = '" + to_update + "'", req.body, function(err,result){
		res.json(result);
	});
});

app.listen(3000);
console.log('Server running');
