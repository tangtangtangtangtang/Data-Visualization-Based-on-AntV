const mongoose = require('mongoose');
const db = mongoose.createConnection("mongodb://localhost/datav");
db.on('error', function callback() {
    console.log("Connection error");
});

db.once('open', function callback() {
    console.log("Mongo working!");
});

const userModel = require('./user');
const graphModel = require('./graph');

module.exports = {
    userModel,
    graphModel
}