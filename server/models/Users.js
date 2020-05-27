const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        min: 6,
        max: 16
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum : ['user', 'admin']
    },
    todos : [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
});

userSchema.pre('save', function(next){
    if(this.isModified){
        bcrypt.hash(this.password, 10, function(err, hash) {
            if(err) return next(err)
            this.password = hash;
            next();
        });
    }else{
        next();
    }
})

userSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatched) {
        if(err){
            return cb(err);
        } 
        if(!isMatched){
            return cb(null, isMatched)
        }else{
            return cb(null, this);
        }
    });
}

module.exports = mongoose.model('User', userSchema);