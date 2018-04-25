module.exports = {
    uploadManger: async (ctx) => {
        console.log(ctx.request.body);
        return ctx.body = {
            message: ""
        }
    }
}