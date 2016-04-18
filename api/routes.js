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
    require('./routes/superAdmin.js')(app, isLoggedIn, isSuper)

    app.get('*',isLoggedIn, function(req, res){
      console.log("404 happened in routes");
      // res.status(404);
    });

    // app.all('/loggedin', function(req, res) {
    //     console.log("does this even happen???");
    //     res.send(req.isAuthenticated() ? req.user : '0');
    // });

    
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

    db.query("SELECT norsekeyID FROM AdminLF WHERE superPrivilege=" + req.body.username + "'", function(err,result){
        console.log(req.body);
        console.log(req.user);
        if(result.length() == 1){
            return next();
        }
        else{
            console.log("DOES NOT LOOK LIKE YOU BELONG TO THE SUPER COOL CLUB " + req.route.path);
            res.redirect('/');
            res.status(401);
        }
    });
}

// function isLoggedIn(req, res, next) {

//     if (req.isAuthenticated())
//         return next();

//     else{
//         console.log("need to authenticate " + req.route.path);
//         res.redirect('/')
//         res.status(401);
//     }

// }
