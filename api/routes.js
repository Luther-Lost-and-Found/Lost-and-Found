var express = require('express'),
    path = require('path');

module.exports = function(app, passport) {
    require('./routes/login.js')(app, passport)
    require('./routes/itemlist.js')(app, passport, isLoggedIn)
    require('./routes/logout.js')(app, passport, isLoggedIn)
    require('./routes/additem.js')(app, passport, isLoggedIn)
    require('./routes/search.js')(app, passport, isLoggedIn)
    require('./routes/tagsRoute.js')(app, passport, isLoggedIn)
    require('./routes/guest.js')(app)

    app.all('*', isLoggedIn, function(req, res) {
        console.log("This shouldn't be called");
        res.redirect('/');
        res.status(401);
    });

    app.all('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
};


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    else{
        console.log("need to authenticate " + req.route.path);
        res.redirect('/')
        res.status(401);
    }

}
