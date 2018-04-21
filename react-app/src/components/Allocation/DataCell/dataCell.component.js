import React, { Component } from "react"
import { Input, Button, Icon } from "antd"
import "./dataCell.component.less"

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
                        return <WrapInput id={this.props.rowNum + "-" + index} cellValue={this.props.rowData[index]} onCellValueChange={this.props.onCellValueChange} />
                    })
                }
            </div>
        )
    }
}


//最外层
export default class EditableCell extends Component {

    constructor(props) {
        super(props);
        this.submitData = this.submitData.bind(this);
        this.createData = this.createData.bind(this);
        this.expand = this.expand.bind(this);
        this.state = {
            expand: false
        }
    }
    createData(key, value) {
        let result = {};
        result[key] = value;
        return result;
    }

    submitData() {
        //先处理数据称csv格式JSON
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
        this.props.onKeyValueChange();
        //进行redux变化，改变JSONData
        this.props.onJSONDataChange(JSONData);
    }

    expand() {
        this.setState({
            expand: !this.state.expand
        })
    }

    render() {
        //dataArray僅用於實現遍歷生成元素
        let dataArray = new Array(15).fill('');
        dataArray = dataArray.map(item => {
            return new Array(5).fill('')
        })
        let xName = ["X轴", "Y轴", "Y轴2", "Y轴3", "Y轴4", "Y轴5"]
        return (
            <React.Fragment>
                <div style={this.state.expand ? { right: 0 } : { right: -420 }} className={"dataTable"}>
                    <span className="rowNum">0</span>
                    {
                        dataArray[0].map((item, index) => {
                            return <span className="topprefix">{xName[index]}</span>
                        })
                    }
                    {
                        dataArray.map((item, index) => {
                            return <WrapRow columnNum={dataArray[0]} rowNum={index} onCellValueChange={this.props.onCellValueChange} rowData={this.props.excelData[index]} />
                        })
                    }
                    <Button style={{ float: 'right', marginTop: "10px" }} onClick={this.submitData}>确定</Button>
                    <Icon onClick={this.expand} className="zhankai" type="zhankai" />
                </div>
            </React.Fragment>
        )
    }
}