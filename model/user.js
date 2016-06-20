var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
   fullname : 'String',
    username : 'String',
    password: 'String',
    type : 'String',
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

module.exports = mongoose.model('User', userSchema);
