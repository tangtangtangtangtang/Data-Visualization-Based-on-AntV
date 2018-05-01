import React, { Component } from 'react'
import RightSidePanel from '../../RightSidePanel/index'
import allocationConfig from '../config'
import { Select, InputNumber, Col, Row, Form, Button, Input, Slider } from 'antd'
import { ALLOCATIONCHANGED } from '../../../actions/actionType'
import deepClone from 'lodash.clonedeep'
//总Allocation 
export default class GeomAllocation extends Component {
    constructor(props) {
        super(props);
        this.allocationChange = this.allocationChange.bind(this)
        this.drawPicture = this.drawPicture.bind(this)
        this.createData = this.createData.bind(this)
        this.formChange = this.formChange.bind(this)
        this.state = {
            form: {},
            allocation: {}
        }
    }

    formChange(changedFields, allFields) {
        let result = deepClone(this.state.allocation)
        if (!result[allFields.key]) {
            result[allFields.key] = {};
        }
        let newOne = Object.assign({}, result[allFields.key], changedFields);
        result[allFields.key] = newOne
        this.setState({
            allocation: result
        })
    }

    componentWillReceiveProps(receiveProps) {
        this.setState({
            form: this.props.keys && this.props.keys.map(dataKey => {
                let WrappedRowForm = Form.create({
                    onValuesChange: (props, changedFields, allFields) => {
                        props.onChange(changedFields, allFields)
                    },
                    mapPropsToFields: (props) => {
                        let dataObject = props.allocation.scale[dataKey];
                        return {
                            "max": Form.createFormField({ value: dataObject && dataObject.max }),
                            "min": Form.createFormField({ value: dataObject && dataObject.min }),
                            "type": Form.createFormField({ value: dataObject && dataObject.type })
                        }
                    }
                })(RowForm)
                return <WrappedRowForm allocation={receiveProps.allocation} onChange={this.formChange} dataKey={dataKey} />
            }),
        })
        return true
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.keys) !== JSON.stringify(this.props.keys)) {
            this.props.onFlashAllocationScale();
        }
    }

    //图标细分类型变化
    allocationChange(value, ele) {
        this.props.onAllocationChangeKinds(ele.props.id, value)
    }

    createData(key, value) {
        let result = {};
        result[key] = value;
        return result;
    }

    drawPicture() {
        // let JSONData = []
        // this.props.excelData.forEach((row, index) => {
        //     let rowData = {}
        //     if (index !== 0) {
        //         row.forEach((item, index, ar) => {
        //             if (this.props.excelData[0][index] && row[index]) {
        //                 rowData = Object.assign({}, rowData, this.createData(this.props.excelData[0][index], item))
        //             }
        //             if (typeof ar[index + 1] === "undefined" && JSON.stringify(rowData) !== "{}") {
        //                 JSONData.push(rowData)
        //             }
        //         })
        //     }
        // })
        // this.props.onJSONDataChange(JSONData);
        // this.props.onGrpahManger(JSONDATACHANGED);
        this.props.onUpdateAllocationScale(this.state.allocation)
        this.props.onGraphManger(ALLOCATIONCHANGED);
    }

    render() {
        const kindsConfig = allocationConfig[this.props.graphType]
        let Allocation = <div style={{ margin: "5% 3%" }}>
            <Row>
                <Col span={10}>
                    类型：
                    <Select onChange={this.allocationChange} defaultValue={kindsConfig[0].key} style={{ width: 140 }}>
                        {kindsConfig && kindsConfig.map(item => {
                            return <Select.Option id="kinds" value={item.key}>{item.value}</Select.Option>
                        })}
                    </Select>
                </Col>
            </Row>
            {
                Array.isArray(this.state.form) ? this.state.form.slice(0, 2) : ""
            }
            <Row>
                <Col span={10}>
                    坐标轴：
                    <Select onChange={this.allocationChange} defaultValue={allocationConfig.coord[0].key} style={{ width: 140 }}>
                        {allocationConfig && allocationConfig.coord.map(item => {
                            return <Select.Option id="coord" value={item.key}>{item.value}</Select.Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <Button onClick={this.drawPicture} style={{ position: "absolute", bottom: "1%", right: "1%" }}>绘制</Button>
        </div>
        return (
            <RightSidePanel moveDistance={420} IconTop="20%" color="black" content={Allocation}></RightSidePanel>
        )
    }
}
//RowForm
class RowForm extends Component {
    constructor(props) {
        super(props);
        this.typeChange = this.typeChange.bind(this)
        this.state = {
            type: "",
        }
    }

    // componentWillReceiveProps(props) {
    //     if (!this.state.type) {
    //         this.setState({
    //             type: props.allocation.scale[props.dataKey]
    //         })
    //     }
    //     return true
    // }

    typeChange(value) {
        this.setState({
            type: value
        })
    }

    render() {
        let { getFieldDecorator } = this.props.form
        let allKindsOfInput = {
            min: <Col span={7}>
                <span style={{ display: "block" }}>最大值</span>
                <Form.Item>
                    {getFieldDecorator(`max`, {

                    })(<InputNumber />)}
                </Form.Item>
            </Col>,
            max: <Col span={7}>
                <span style={{ display: "block" }}>最小值</span>
                <Form.Item>
                    {getFieldDecorator(`min`, {

                    })(<InputNumber />)}
                </Form.Item>
            </Col>,
            tickCount: <Col span={7}>
                <span style={{ display: "block" }}>坐标间隔数</span>
                <Form.Item>
                    {getFieldDecorator(`tickCount`, {

                    })(<InputNumber />)}
                </Form.Item>
            </Col>,
            exponent: <Col span={7}>
                <span style={{ display: "block" }}>指数</span>
                <Form.Item>
                    {getFieldDecorator(`exponent`, {

                    })(<InputNumber />)}
                </Form.Item>
            </Col>,
            base: <Col span={7}>
                <span style={{ display: "block" }}>底数</span>
                <Form.Item>
                    {getFieldDecorator(`base`, {

                    })(<InputNumber />)}
                </Form.Item>
            </Col>,
            mask: <Col span={7}>
                <span style={{ display: "bloack" }}>格式化</span>
                <Form.Item>
                    {getFieldDecorator(`mask`, {

                    })(<Input />)}
                </Form.Item>
            </Col>,
            formatter: <Col span={7}>
                <span style={{ display: "bloack" }}>格式化</span>
                <Form.Item>
                    {getFieldDecorator(`formatter`, {

                    })(<Input />)}
                </Form.Item>
            </Col>,
            range: <Col span={7}>
                <span style={{ display: "bloack" }}>范围(0-1)</span>
                <Form.Item>
                    {getFieldDecorator(`range`, {

                    })(<Slider range={true} max={1} min={0} />)}
                </Form.Item>
            </Col>,
        };
        let combination = {
            'linear': ['min', 'max', 'tickCount', 'formatter'],
            'cat': ['range', 'tickCount', 'formatter'],
            'log': ['min', 'max', 'base', 'formatter', 'tickCount'],
            'pow': ['min', 'max', 'exponent', 'formatter', 'tickCount'],
            'time': ['min', 'max', 'mask', 'tickCount'],
            'timeCat': ['range', 'max', 'tickCount']
        }
        return (<Row>
            <Form>
                <Col span={10}>
                    <span style={{ display: "block" }}>{this.props.dataKey}</span>
                    <Form.Item>
                        {
                            getFieldDecorator(`type`, {
                            })(<Select style={{ width: 140 }} onChange={this.typeChange} >
                                {allocationConfig.Scale.map(item => {
                                    return <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                })}
                            </Select>)
                        }
                    </Form.Item>
                </Col>
                {
                    combination[this.state.type] ? combination[this.state.type].map(item => {
                        return allKindsOfInput[item];
                    }) : ""
                }
                <Col span={0}>
                    <Form.Item>
                        {getFieldDecorator(`key`, {
                            initialValue: this.props.dataKey
                        })(<Input />)}
                    </Form.Item>
                </Col>
            </Form>
        </Row>
        )
    }
}


//废弃Scale Allocation Form
// class AllocationScale extends Component {
//     constructor(props) {
//         super(props);
//         this.submitScale = this.submitScale.bind(this);
//         this.formChange = this.formChange.bind(this);
//         this.state = {
//             onSubmit: 0,
//         }
//     }

//     submitScale() {
//         this.setState({
//             onSubmit: this.state.onSubmit + 1
//         })
//     }

//     formChange(changeFields, allFields) {
//         let key = allFields.key.value;
//         this.props.onUpdateAllocationScale(key, changeFields)
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 {
//                     this.props.keys && this.props.keys.map(dataKey => {
//                         let WrappedRowForm = Form.create(
//                             // {
//                             //     onValuesChange(props, changedFields, allFields) {
//                             //         props.onChange(changedFields, allFields)
//                             //         return changedFields
//                             //     }
//                             // }
//                         )(RowForm)
//                         return <WrappedRowForm onChange={this.formChange} dataKey={dataKey} onUpdateAllocationScale={this.props.onUpdateAllocationScale} />
//                     })
//                 }
//             </React.Fragment>

//         )
//     }
// }
