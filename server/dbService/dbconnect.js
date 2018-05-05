const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/datav");
const db = mongoose.connection
const userModel = require('./user');
const graphModel = require('./graph');
db.on('error', function () {
    console.log("Connection error");
});

db.once('open', function () {
    console.log('opening')
});

module.exports = {
    userModel,
    graphModel
}