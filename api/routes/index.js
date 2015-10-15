var express = require('express'),
    path = require('path');

module.exports = function(app, db, isLoggedIn) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(app.locals.rootDir + '/public/login/login.html'));
    });
};
