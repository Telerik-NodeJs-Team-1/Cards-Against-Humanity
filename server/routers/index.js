"use strict";

let fs = require('fs'),
    path = require('path');
var paginate = require('express-paginate');

module.exports = function(app, upload) {
    app.use(paginate.middleware(10, 50));

    app.all('*', function(req, res, next){
        res.locals.user = req.user;
        next();
    });

    fs.readdirSync(__dirname)
        .filter(file => file.indexOf('-router') >= 0)
        .forEach(file => require(path.join(__dirname, file))(app));
};