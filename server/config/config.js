
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://taTeam1:taTeam1@ds039115.mongolab.com:39115/cards-against-humanity', /*'mongodb://localhost/cards-against-humanity',*/
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://taTeam1:taTeam1@ds039115.mongolab.com:39115/cards-against-humanity',
        port: process.env.PORT || 3030
    }
};