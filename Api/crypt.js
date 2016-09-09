
var crypto = require('crypto');

exports.salt = function (cb) {
    crypto.randomBytes(20, function (err, buf) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, buf.toString('base64'));
        }
    });
};

exports.hash  = function (password, salt, cb){
    crypto.pbkdf2(password, salt, 1000, 64, function (err, key){
       if(err) {
           cb(err, null);}
       else{
           cb(null, key.toString('base64'));
       }

    });
}
