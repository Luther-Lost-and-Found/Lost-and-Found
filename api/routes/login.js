var express = require('express'),
    passport = require('passport');
    path = require('path');

// module.exports = function(router,db){

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

  console.log("hi");

  app.get('/login', function(req, res) {
    console.log("get");
    res.sendFile(path.join(app.locals.rootDir + '/public/login/login.html')); // load the index.ejs file
  });

  app.post('/login', function(req, res) {
    
    console.log(req.body);
    res.sendFile(path.join(app.locals.rootDir + '/public/itemList.html'));

  
  });
}