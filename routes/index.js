var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var User = require('../model/user.js');
var users = require('./users.js');
var crypt=require('../Api/crypt.js')
var bodyParser = require('body-parser');
router.use('/users', users);

router.post('/register', register);
function register(req, res, next){
    var user =new User();
    req.body.type = "SuperAdmin";
    var user = req.body;
     var salt;
    getSalt()
   .then(function(salt){
        req.body.salt =salt;
        return  computeHash(req.body.password, salt)
    }).then(function(hash){
      req.body.password = hash;
    }).then(function(){
            User.create(user,function(err, data){
                res.redirect('/users/success');
        })
        })
};

function getSalt(){
    return new Promise(function(resolve, reject) {
        crypt.salt(function(err, data){
            if(err) reject(err);
            else if(data){
                console.log(data);
                resolve(data);
            }
        })
    });

}


function computeHash(password, salt) {
    return new Promise(function (resolve, reject) {
        crypt.hash(password, salt, function (err, hash) {
            if (err) reject( err);
            else resolve(hash);
        });
    });
}


//function generateSalt(){
//    crypt.randomBytes(16, function(err, data, callback){
//        if(err)
//            callback(err);
//        else
//        callback(data.toString('hex'));
//    })
//}

router.get('/login', function(req, res){
    res.render('users/userLogin');

    //req.session =
    //
})
/* GET home page. */
//router.get('/oi', function(req, res, next) {
// console.log("dsdsds");
//});

module.exports = router;
