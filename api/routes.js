var express = require('express'),
    path = require('path');

module.exports = function(app, passport) {
    require('./routes/index.js')(app, passport, isLoggedIn)
    require('./routes/login.js')(app, passport)
    require('./routes/itemlist.js')(app, passport, isLoggedIn)
    require('./routes/logout.js')(app, passport)

    app.get('*', isLoggedIn, function(req, res) {
        res.redirect('/');
    });

    app.get('/', function(req, res) {
        console.log("hwerwer");
        res.render('index.html'); // load the index.ejs file
    });
};


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    else{
        console.log("ASDFFFFFFFFFFFFFFFFFFFFFFF");
        res.status(401);
    }

}
