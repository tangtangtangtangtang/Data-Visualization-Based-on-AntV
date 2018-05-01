const mongoose = require('mongoose')

//graph schema
const graphSchema = new mongoose.Schema({
    allocation: {
        kinds: Array,
        toolTip: Array,
        scale: mongoose.Schema.Types.Mixed, //原本为Object、但内容不定所以存储前需要转为JSON字符串
        legend: Array
    },
    path: String,
    fileType: String,
    name: String,
    owner: String //与users.account相同
})
graphSchema.statics.findByOwner = (owner, callback) => {
    return this.find(owner, callback)
}


const graphModel = mongoose.model("graph", graphSchema);

module.exports = graphModel