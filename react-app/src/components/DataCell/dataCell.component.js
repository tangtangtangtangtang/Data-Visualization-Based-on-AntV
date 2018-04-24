import React, { Component } from "react"
import { Input, Button, Icon } from "antd"
import "./dataCell.component.less"
import RightSidePanel from "../RightSidePanel/RightSidePanel.component";

//单元格
class WrapInput extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this)

    }

    onValueChange(e) {
        // this.props.onKeyValueChange();
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
                        return <WrapInput id={this.props.rowNum + "-" + index} cellValue={this.props.rowData[index]} onCellValueChange={this.props.onCellValueChange} onKeyValueChange={this.props.onKeyValueChange} />
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
        this.submitData = this.submitData.bind(this);
    }

    submitData() {
        this.props.onKeyValueChange();
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
                <span className="rowNum">0</span>
                {
                    dataArray[0].map((item, index) => {
                        return <span className="topprefix">{xName[index]}</span>
                    })
                }
                {
                    dataArray.map((item, index) => {
                        return <WrapRow columnNum={dataArray[0]} rowNum={index} onCellValueChange={this.props.onCellValueChange} onKeyValueChange={this.props.onKeyValueChange} rowData={this.props.excelData[index]} />
                    })
                }
                <Button style={{ position: "absolute", right: "1%", bottom: "1%" }} onClick={this.submitData}>确定</Button>
            </React.Fragment >
        )
    }
}

export default class Wrap extends Component {
    render() {
        let content = <EditableCell onCellValueChange={this.props.onCellValueChange}
            onKeyValueChange={this.props.onKeyValueChange}
            excelData={this.props.excelData} />
        return (
            <RightSidePanel IconTop="30%" color="red" content={content} />
        )
    }
}