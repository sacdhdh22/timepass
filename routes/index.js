var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var User = require('../model/user.js');
var users = require('./users.js');
var bodyParser = require('body-parser');
router.use('/users', users);

router.post('/register', register);
function register(req, res, next){
    var user = new User();
    user.fullname = req.body.fullname;
    user.password = req.body.password;
    user.username = req.body.username;
    user.type= "SuperUser";
    User.create(user,function(err, data){
    res.redirect('/users/success');
    })
};

router.get('/login', function(req, res){
    res.render('users/userLogin');
})
/* GET home page. */
//router.get('/oi', function(req, res, next) {
// console.log("dsdsds");
//});

module.exports = router;
