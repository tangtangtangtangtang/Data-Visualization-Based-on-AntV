const fs = require('fs-extra')
const path = require('path')
const send = require('koa-send')
const koaBody = require('koa-body')
module.exports = {
    uploadManger: async (ctx) => {
        let flag = false, fileURL, saveFileName;
        await fs.ensureDir(path.resolve(__dirname + '/../fileStore'))
            .then((err) => {
                //save file
                let file = ctx.request.body.files.csvData
                let reader = fs.createReadStream(file.path)
                let fileExt = file.name.split(".")[1];
                saveFileName = `temp.${fileExt}`
                let writer = fs.createWriteStream(path.resolve(__dirname + `/../fileStore/${saveFileName}`));
                reader.pipe(writer)
                ctx.body = {
                    code: true,
                    fileName: saveFileName
                }
            })
            .catch((err) => {
                console.log(err)
                fs.mkdir(__dirname + '/../fileStore')
            })
    },
    sendFile: async (ctx) => {
        let fileName = ctx.request.query.fileName
        let fileExt = fileName.split('.').pop()
        await send(ctx, fileName, {
            root: __dirname + `/../fileStore`
        })
            .then((res) => {
                let contentType = fileExt === 'csv' ? 'text/csv;charset=gbk' : 'application/json;charset=gbk'
                ctx.set('Content-Type', contentType);
            })
            .catch((err) => {
                console.log(err)
                ctx.body = {
                    code: false,
                    message: err.message
                }
            })
    }
}