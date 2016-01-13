"use strict";

let fs = require('fs'),
    path = require('path');

module.exports = function(app, upload) {
    app.all('*', function(req, res, next){
        res.locals.user = req.user;
        next();
    });

    fs.readdirSync(__dirname)
        .filter(file => file.indexOf('-router') >= 0)
        .forEach(file => require(path.join(__dirname, file))(app));
};