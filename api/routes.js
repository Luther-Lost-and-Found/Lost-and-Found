var express = require('express'),
    path = require('path');

module.exports = function(app, passport) {
    require('./routes/index.js')(app, passport, isLoggedIn)
    require('./routes/login.js')(app, passport, isLoggedIn)
    require('./routes/itemlist.js')(app, passport, isLoggedIn)

    app.get('*', isLoggedIn, function(req, res) {
        return res.status(404)
    })
};


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();


    res.redirect('/')

}
