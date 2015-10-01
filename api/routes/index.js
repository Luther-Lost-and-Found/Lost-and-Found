var express = require('express'),
    path = require('path');

module.exports = function(app, db) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(app.locals.rootDir + '/public/index.html'));
    });
    require('./itemlist.js')(app, db)
};
