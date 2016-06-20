var express = require('express');
var router = express.Router();
var user = require('../model/user.js');
/* GET users listing. */
router.get('/success', function(req, res, next) {
 res.render("users/successRegistration");
});

router.post('/registerDependents', registerDependents);
router.post('/login', function(req, res){

 user.findSuperUser(function(err, data){
 if(req.body.username = data.username && req.body.password == data.password)
 {
   res.render('users/userHome');
 }
   else
 {
   res.render("users/notPossible");
 }

 });
})
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
