import React, { Component } from 'react'
import RightSidePanel from '../../RightSidePanel/index'
import allocationConfig from '../config'
import { Select, InputNumber, Col, Row, Form, Button } from 'antd'
//总Allocation 
export default class GeomAllocation extends Component {
    constructor(props) {
        super(props);
        this.allocationChange = this.allocationChange.bind(this)
        this.drawPicture = this.drawPicture.bind(this)
        this.createData = this.createData.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.keys) !== JSON.stringify(this.props.keys)) {
            this.props.onFlashAllocationScale()
        }
    }

    allocationChange(value, ele) {
        this.props.onAllocationChangeKinds(ele.props.id, value)
    }

    createData(key, value) {
        let result = {};
        result[key] = value;
        return result;
    }

    drawPicture() {
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
        this.props.onJSONDataChange(JSONData);

    }

    render() {
        const kindsConfig = allocationConfig[window.location.hash.replace("#", "")]
        let Allocation = <div style={{ margin: "5% 3%" }}>
            <Row>
                <Col span={10}>
                    类型：
                    <Select onChange={this.allocationChange} defaultValue={"base"} style={{ width: 140 }}>
                        {kindsConfig.map(item => {
                            return <Select.Option id="kinds" value={item.key}>{item.value}</Select.Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <AllocationScale allocation={this.props.allocation} onUpdateAllocationScale={this.props.onUpdateAllocationScale} keys={this.props.keys} />
            <Button onClick={this.drawPicture} style={{ position: "absolute", bottom: "1%", right: "1%" }}>绘制</Button>
        </div>
        return (
            <RightSidePanel moveDistance={420} IconTop="20%" color="black" content={Allocation}></RightSidePanel>
        )
    }
}

//Scale Allocation Form
class AllocationScale extends Component {
    constructor(props) {
        super(props);
        this.submitScale = this.submitScale.bind(this);
        this.formChange = this.formChange.bind(this);
        this.state = {
            onSubmit: 0,
        }
    }

    submitScale() {
        this.setState({
            onSubmit: this.state.onSubmit + 1
        })
    }

    formChange(changeFields, allFields) {
        let key = allFields.key.value;
        this.props.onUpdateAllocationScale(key, changeFields)
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.keys && this.props.keys.map(dataKey => {
                        let WrappedRowForm = Form.create({
                            onFieldsChange(props, changedFields, allFields) {
                                props.onChange(changedFields, allFields)
                            },
                            mapPropsToFields(props) {
                                let dataObject = props.allocation.scale[dataKey];
                                return {
                                    "key": Form.createFormField({ value: dataKey }),
                                    "max": Form.createFormField({ value: (dataObject && dataObject.max) ? dataObject.max.value : 100 }),
                                    "min": Form.createFormField({ value: (dataObject && dataObject.min) ? dataObject.min.value : 0 }),
                                    "type": Form.createFormField({ value: (dataObject && dataObject.type) ? dataObject.type.value : "" })
                                }
                            },
                            onValuesChange(props, values) {
                                // this.props.onUpdateAllocationScale(dataKey, values)
                            },
                        })(RowForm)
                        return <WrappedRowForm onChange={this.formChange} dataKey={dataKey} allocation={this.props.allocation} onUpdateAllocationScale={this.props.onUpdateAllocationScale} />
                    })
                }
            </React.Fragment>

        )
    }
}

// const WrappedAllocationScale = Form.create()(AllocationScale)

//RowForm
class RowForm extends Component {
    constructor(props) {
        super(props);
        this.submitRowForm = this.submitRowForm.bind(this)
        this.state = {
            onSubmit: this.props.onSubmit
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.onSubmit + 1 === this.props.onSubmit) {
            this.submitRowForm()
        }
    }

    submitRowForm() {
        let { getFieldsValue } = this.props.form
        let key = this.props.dataKey
        let result = {}
        result[key] = getFieldsValue()
        this.props.onUpdateAllocationScale(result);
    }

    render() {
        let { getFieldDecorator } = this.props.form
        return (<Row>
            <Form>
                <Col span={10}>
                    <span style={{ display: "block" }}>{this.props.dataKey}</span>
                    <Form.Item>
                        {
                            getFieldDecorator(`type`, {
                            })(<Select style={{ width: 140 }}>
                                {allocationConfig.Scale.map(item => {
                                    return <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                })}
                            </Select>)
                        }
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <span style={{ display: "block" }}>最大值</span>
                    <Form.Item>
                        {getFieldDecorator(`max`, {

                        })(<InputNumber />)}
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <span style={{ display: "block" }}>最小值</span>
                    <Form.Item>
                        {getFieldDecorator(`min`, {

                        })(<InputNumber />)}
                    </Form.Item>
                </Col>
            </Form>
        </Row>
        )
    }
}