const mongoose = require('mongoose')

//graph schema
const graphSchema = new mongoose.Schema({
    'allocation': Object,
    'fileName': String,
    'fileType': String,
    'name': String,
    'graph': String,
    'owner': String //与users.account相同
})
graphSchema.statics.findByOwner = (owner, callback) => {
    return this.find(owner, callback)
}


const graphModel = mongoose.model("graph", graphSchema);

module.exports = graphModel