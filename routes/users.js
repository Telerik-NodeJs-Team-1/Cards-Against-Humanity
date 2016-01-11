var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users-controller');

/* GET users listing. */
router.get('/', function(req, res, next) {

  usersController.getAllUsers()
      .then(function success(collection){
        res.render('users', { users: collection });
      });
});

module.exports = router;
