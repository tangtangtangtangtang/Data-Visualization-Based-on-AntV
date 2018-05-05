const mongoose = require('mongoose')

//user schema
const userSchema = mongoose.Schema({
    'account': String,
    'password': String,
    'nickname': String,
})

userSchema.statics.findByAccount = (account, callback) => {
    return this.find(account, callback);
}

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;