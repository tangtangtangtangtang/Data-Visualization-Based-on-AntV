import React, { Component } from "react"
import { Input, Button, Upload, Icon, message } from "antd"
import "./dataCell.component.less"
import RightSidePanel from "../RightSidePanel/index";
import { UPDATEDATA, CSVFILECHANGED, JSONDATACHANGED } from '../../actions/actionType'
import axios from 'axios'

//单元格
class WrapInput extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this)

    }

    onValueChange(e) {
        this.props.onCellValueChange(this.props.id, e.target.value)
    }

    render() {
        return (
            <React.Fragment>
                <Input className="dataCell" onChange={this.onValueChange} />
            </React.Fragment>
        )
    }
}

//行包裹层
class WrapRow extends Component {
    render() {
        return (
            <div className="dataRow">
                <span className="rowNum">{this.props.rowNum + 1}</span>
                {
                    this.props.columnNum.map((item, index) => {
                        return <WrapInput key={index} id={this.props.rowNum + "-" + index} cellValue={this.props.rowData[index]} onCellValueChange={this.props.onCellValueChange} />
                    })
                }
            </div>
        )
    }
}


//最外层
class EditableCell extends Component {

    constructor(props) {
        super(props);
        this.createData = this.createData.bind(this)
        this.submit = this.submit.bind(this)
    }

    createData(key, value) {
        let result = {};
        result[key] = value;
        return result;
    }

    submit() {
        let JSONData = []
        this.props.excelData.forEach((row, index) => {
            let rowData = {}
            if (index !== 0) {
                row.forEach((item, index, ar) => {
                    if (this.props.excelData[0][index] && row[index]) {
                        rowData = Object.assign({}, rowData, this.createData(this.props.excelData[0][index], item))
                    }
                    if (typeof ar[index + 1] === "undefined" && JSON.stringify(rowData) !== "{}") {
                        JSONData.push(rowData)
                    }
                })
            }
        })
        this.props.onDataChange(UPDATEDATA, JSONData);
        this.props.onGrpahManger(JSONDATACHANGED);
    }

    render() {
        //dataArray僅用於實現遍歷生成元素
        let dataArray = new Array(15).fill('');
        dataArray = dataArray.map(item => {
            return new Array(5).fill('')
        })
        let xName = ["X轴", "Y轴", "Y轴2", "Y轴3", "Y轴4", "Y轴5"]
        const uploadProps = {
            name: 'csvData',
            accept: "text/csv",
            action: '/api/uploadData',
            showUploadList: false,
            onChange: (info) => {
                if (info.file.status === 'done' && info.file.response.code) {
                    message.success(`${info.file.name} 文件上传成功并保存`);
                    axios.get('/api/getFile?fileName=' + info.file.response.fileName)
                        .then((res) => {
                            this.props.onDataChange(UPDATEDATA, res.data);
                            this.props.onGrpahManger(CSVFILECHANGED);

                        })

                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传错误`);
                }
            },
        }
        return (
            <React.Fragment>
                <span className="rowNum">0</span>
                {
                    dataArray[0].map((item, index) => {
                        return <span key={xName[index]} className="topprefix">{xName[index]}</span>
                    })
                }
                {
                    dataArray.map((item, index) => {
                        return <WrapRow key={index} columnNum={dataArray[0]} rowNum={index} onCellValueChange={this.props.onCellValueChange} rowData={this.props.excelData[index]} />
                    })
                }
                <Upload style={{ position: "absolute", right: "19%", bottom: "1%" }} {...uploadProps}>
                    <Button>
                        <Icon type="upload" />上传数据文件
                    </Button>
                </Upload>
                <Button style={{ position: "absolute", right: "1%", bottom: "1%" }} onClick={this.submit}>确定</Button>
            </React.Fragment >
        )
    }
}

export default class Wrap extends Component {
    render() {
        let content = <EditableCell onCellValueChange={this.props.onCellValueChange}
            excelData={this.props.excelData}
            chart={this.props.chart}
            onDataChange={this.props.onDataChange}
            onGrpahManger={this.props.onGrpahManger}
        />
        return (
            <RightSidePanel IconTop="30%" color="black" content={content} />
        )
    }
}