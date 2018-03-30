const path = require("path")
module.exports = {
    index: async (ctx) =>{
        await ctx.render("index.ejs")
    }
}