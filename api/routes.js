var express = require('express'),
    path = require('path');

module.exports = function(app, passport) {
    require('./routes/login.js')(app, passport)
    require('./routes/itemlist.js')(app, passport, isLoggedIn)
    require('./routes/logout.js')(app, passport)
    require('./routes/additem.js')(app, passport)
    require('./routes/search.js')(app, passport, isLoggedIn)

    app.get('/#/*', isLoggedIn, function(req, res) {
        res.redirect('/');
    });

    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
};


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    else{
        console.log("need to authenticate");
        res.redirect('/#/')
        res.status(401);
    }

}
