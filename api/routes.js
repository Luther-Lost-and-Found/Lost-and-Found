var express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    dbconfig = require('../config/database'),
    db = mysql.createConnection(dbconfig.connection);
    
db.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {
    require('./routes/login.js')(app, passport)
    require('./routes/itemlist.js')(app, passport, isLoggedIn)
    require('./routes/logout.js')(app, passport)
    require('./routes/additem.js')(app, passport, isLoggedIn)
    require('./routes/search.js')(app, passport, isLoggedIn)
    require('./routes/tagsRoute.js')(app, passport, isLoggedIn)
    require('./routes/settings.js')(app, passport, isLoggedIn)
    require('./routes/guest.js')(app)
    require('./routes/superAdminPage.js')(app, passport, isLoggedIn, isSuper)
    require('./routes/changePassword.js')(app, passport, isLoggedIn)

    app.get('*',isLoggedIn, function(req, res){
      res.redirect('/');
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

function isSuper(req,res,next){

    if(req.user.superPrivilege == 1){
        return next();
    }
    else{
        res.redirect('/itemlist');
        res.status(454);
    }
}