var passport = require('passport');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');
var Index = require('./index.js');
var crypt = require('../Api/crypt.js');
/* GET users listing. */
router.get('/success', function(req, res, next) {
 res.render("users/successRegistration");
});

router.post('/registerDependents', authorize, registerDependents);

router.post('/login', function(req, res) {


    passport.authenticate('local', function(err, user, info) {
        if (err)
            res.render("users/notPossible");
        else if (user) {
            res.render('users/userHome');
        }
        else {
            res.render("users/notPossible");
        }
    })(req, res);

});


function getSalt(){
    return new Promise(function(resolve, reject){
        crypt.salt(function(err, salt){
          if(err)
          reject(err);
          else if(!salt)
          reject(err);
          else
          resolve(salt);
        });
    })

}

function compareHash(hash1, hash2){
    return new Promise(function(resolve, reject){
        if(hash1 == hash2){
            resolve();
        }
        else {
            reject( new onOpError());
             }
    })
}

function computeHash(password, salt){
return new Promise(function(resolve, reject){
  crypt.hash(password, salt, function(err, hash){
      if(err)
      reject( new (onOpError()));
      else if(!hash)
      reject(err);
      else
      resolve(hash);
  })
});
}

function authorize(req, res, next){
    console.log(req.session);
    if(req.session.user){
        res.render('users/userHome');
    }
    else{
        res.render('users/userHome');
    }
}

function findUserBYUserName(username){
    return new Promise(function(resolve, reject) {
    User.findByUserName(username, function(err, user){
        if(err)
          reject(err);
        else if(!user)
            reject(err);
        else
           resolve(user);

    });
    });
}

function registerDependents(req, res, next){
  var id;
  //console.log(req.body)
  User.findSuperUser(function(err, data){
    if(err) res.send(err);
    else{
      req.body.adminId = data._id;
      User.create(req.body, function(err, doc){
        if(err) res.send(err);
        else res.send(doc);
      })
    }
  })



}


module.exports = router;
