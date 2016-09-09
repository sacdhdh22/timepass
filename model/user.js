
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
   fullname : String,
    username : String,
    salt: String,
    type : String,
    password : String,
    adminId : ObjectId
});

userSchema.statics.findSuperUser = function(callback){
this.findOne({ type : 'SuperUser'},function(err, doc){
    if(err) callback(err);
    else {
        callback(null, doc);
    }
});
};

userSchema.statics.findById = function(userId, callback){
    this.findOne({_id :userId} , function(err, data){
        if(err)
        callback(err);
        else if(!data)
        callback (err);
        else if(data)
        callback (null, data);
    });
}

userSchema.statics.findByUserName = function(username, callback){
    this.findOne({username : username}, function(err, data){
        if(err)
            callback(err);
        else if(!data)
            callback (err);
        else if(data)
            callback (null, data);
    });
}

//userSchema.statics.validPassword = function(password, callback){
//    this.findOne({username : username}, function(err, data){
//        if(err)
//            callback(err);
//        else if(!data)
//            callback (err);
//        else if(data)
//            callback (null, data);
//    });
//}

module.exports= mongoose.model('User', userSchema);
