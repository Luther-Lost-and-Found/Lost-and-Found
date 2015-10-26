var express = require('express'),
	passport = require('passport'),
	mysql = require('mysql'),
	dbconfig = require('../../config/database'),
	path = require('path'),
	db = mysql.createConnection(dbconfig.connection);
	
db.query('USE ' + dbconfig.database);

// // module.exports = function(router,db){

//     router.post('/login', function(req, res, next) {
//       passport.authenticate('local', function(err, user, info) {
//         if (err) {
//           return res.status(500).json({err: err});
//         }
//         if (!user) {
//           return res.status(401).json({err: info});
//         }
//         req.logIn(user, function(err) {
//           if (err) {
//             return res.status(500).json({err: 'Could not log in user'});
//           }
//           res.status(200).json({status: 'Login successful!'});
//         });
//       })(req, res, next);
//     });

//     router.get('/logout', function(req, res) {
//       req.logout();
//       res.status(200).json({status: 'Bye!'});
//     });

// }

module.exports = function(app, passport) {

	app.use(express.static(path.join(__dirname, '/views')));

	app.get('/login', function(req, res) {
		res.sendFile(path.join(app.locals.rootDir + '/public/login/login.html')); // load the index.ejs file
	});

	app.get('/loggedin', function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	// route to log in
	app.post('/login', passport.authenticate('local'), function(req, res) {
		console.log("inside pass login");
		res.send(req.user);
	});

	var auth = function(req, res, next){
		if (!req.isAuthenticated()){
			res.send(401);
		} 
		else next();
	};
}

