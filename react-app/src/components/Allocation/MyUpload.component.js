import "react"
import React, { Component } from "react";
import { Button, message, Icon, Upload } from "antd";

export default class MyUpload extends Component {

    render() {
        const uploadProps = {
            name: 'data',
            accept: "mimeType",
            action: '/uploadData',
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }
        return (
            <Upload {...uploadProps}>
                <Button>
                    <Icon type="upload" />上传数据文件
            </Button>
            </Upload>
        )
    }
}