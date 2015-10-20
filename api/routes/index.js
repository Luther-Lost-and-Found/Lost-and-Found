var express = require('express'),
    path = require('path'),
    express = require('express');


module.exports = function(app, db, isLoggedIn) {
	app.use(express.static(path.join(__dirname, '/public/login')));
	app.engine('.html', require('ejs').__express);
    app.get('/', function(req, res) {
        res.render(path.join(app.locals.rootDir + '/public/index.html'));
    });
};
