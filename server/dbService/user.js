const mongoose = require('mongoose')

//user schema
const userSchema = new mongoose.Schema({
    account: String,
    password: String,
})
const userModel = mongoose.model('users', userSchema);

userSchema.statics.findByAccount = (account, callback) => {
    return this.find(account, callback);
}

module.exports = userModel;