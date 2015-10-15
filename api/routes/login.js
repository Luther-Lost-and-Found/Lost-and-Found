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

  app.get('/', function(req, res) {
    res.sendFile(path.join(app.locals.rootDir + '/public/login/login.html')); // load the index.ejs file
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/itemList.html', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
    }),
        
    function(req, res) {
    console.log("hello");

  res.redirect('/');
  });
}