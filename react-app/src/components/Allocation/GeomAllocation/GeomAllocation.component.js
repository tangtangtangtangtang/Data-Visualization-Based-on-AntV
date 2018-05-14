import React, { Component } from 'react'
import RightSidePanel from '../../RightSidePanel/index'
import allocationConfig from '../config'
import { message, Select, InputNumber, Col, Row, Form, Button, Input, Slider } from 'antd'
import { ALLOCATIONCHANGED, GRAPHNAMECHANGED, GRAPHIDCHANGED } from '../../../actions/actionType'
import deepClone from 'lodash.clonedeep'
import Axios from 'axios';
import store from '../../../store'
//总Allocation 
export default class GeomAllocation extends Component {
    constructor(props) {
        super(props);
        this.allocationChange = this.allocationChange.bind(this)
        this.drawPicture = this.drawPicture.bind(this)
        this.createData = this.createData.bind(this)
        this.formChange = this.formChange.bind(this)
        this.savePicture = this.savePicture.bind(this)
        this.onGraphNameChange = this.onGraphNameChange.bind(this)
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
        if (receiveProps.keys !== this.props.keys) {
            this.setState({
                form: receiveProps.keys && receiveProps.keys.map(dataKey => {
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
                    return <WrappedRowForm allocation={this.props.allocation} onChange={this.formChange} dataKey={dataKey} />
                }),
            })
        }
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

    onGraphNameChange(e) {
        this.props.onGraphManger(GRAPHNAMECHANGED, e.target.value)
    }

    drawPicture() {
        this.props.onUpdateAllocationScale(this.state.allocation)
        this.props.onGraphManger(ALLOCATIONCHANGED);
    }

    savePicture() {
        let states = store.getState()
        if (JSON.stringify(states.userData.info) === '{}') {
            message.error('还未登录，不能保存!');
            return
        }
        Axios.post('/saveGraph', {
            allocation: states.allocation,
            fileName: states.graphManger.csv ? states.csvData.fileName : '',
            fileType: states.graphManger.csv ? 'csv' : states.graphManger.JSONData ? 'json' : '',
            name: states.graphManger.name,
            owner: states.userData.info.account,
            graph: window.location.hash.replace('#', ''),
            data: states.graphManger.JSONData ? states.JSONData.data : '',
            _id: states.graphManger._id
        }).then((res) => {
            if (res.data.code) {
                message.info(res.data.message);
                this.props.onGraphManger(GRAPHIDCHANGED, res.data._id)
            } else {
                message.error(res.data.message)
            }
        })
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
            <Input addonBefore={'名字：'} value={store.getState().graphManger.name} onChange={this.onGraphNameChange} style={{ position: "absolute", width: '40%', bottom: "1%", right: "38%" }}></Input>
            <Button onClick={this.savePicture} style={{ position: "absolute", bottom: "1%", right: "19%" }}>保存</Button>
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