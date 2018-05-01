const fs = require('fs-extra')
const path = require('path')
const send = require('koa-send')
const koaBody = require('koa-body')
module.exports = {
    uploadManger: async (ctx) => {
        let flag = false, fileURL, saveFileName;
        await fs.ensureDir(path.resolve(__dirname + '/../myCsvUploadFile'))
            .then((err) => {
                //save file
                let file = ctx.request.body.files.csvData
                let reader = fs.createReadStream(file.path)
                let fileExt = file.name.split(".")[1];
                let fileName = file.name.split('.')[0];
                saveFileName = `${fileName}${Math.random().toString()}.${fileExt}`
                let writer = fs.createWriteStream(path.resolve(__dirname + `/../myCsvUploadFile/${saveFileName}`));
                reader.pipe(writer)
                flag = true;
            })
            .catch((err) => {
                console.log('fail')
                //mkdir
                fs.mkdir('/upload')
            })
        return ctx.body = {
            flag,
            fileName: saveFileName
        }
    },
    sendFile: async (ctx) => {
        await send(ctx, ctx.request.query.fileName, {
            root: __dirname + `/../myCsvUploadFile`
        });
        ctx.set('Content-Type', 'text/csv;charset=gbk');
    }
}