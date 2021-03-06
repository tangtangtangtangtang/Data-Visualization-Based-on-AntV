import React, { Component } from 'react'
import './SignUp.component.less'
import { message, Modal, Form, Input, Button } from 'antd';
import axios from 'axios'
const FormItem = Form.Item;
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('/api/signUp', values, {
                    responseEncoding: 'utf-8'
                })
                    .then((res) => {
                        if (res.data.code) {
                            message.success(res.data.message)
                            this.props.handleCancel();
                        } else {
                            message.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 18, offset: 1 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 10,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="账号"
                >
                    {getFieldDecorator('account', {
                        rules: [{
                            max: 10, message: '最长不多于10位',
                        }, {
                            min: 6, message: '最短不少于6位',
                        }, {
                            required: true, message: '请输入账号',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="昵称"
                >
                    {getFieldDecorator('nickname', {
                        rules: [{
                            max: 20, message: '昵称过长',
                        }, {
                            min: 3, message: '昵称过短',
                        }, {
                            required: true, message: '请输入昵称',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            min: 6, message: '至少6位密码',
                        }, {
                            required: true, message: '请输入密码',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
        this.state = {
            visible: false,
            isLogIn: false,
        }
    }

    componentWillReceiveProps() {
        if (JSON.stringify(this.props.userData.info) !== '{}') {
            this.setState({
                isLogIn: true
            })
        } else {
            this.setState({
                isLogIn: false
            })
        }
        return true
    }

    showModal() {
        this.setState({
            visible: true
        })
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }

    render() {

        const WrappedRegistrationForm = Form.create()(RegistrationForm)

        return (
            <React.Fragment>
                <Button style={this.state.isLogIn ? { display: 'none' } : { border: "none", padding: 0, width: "100%", textAlign: "center" }} onClick={this.showModal}>注册</Button>
                <span style={this.state.isLogIn ? { width: "100%", textAlign: "center", overflow: 'hidden', display: 'inline-block', margin: '0 auto', height: '64px' } : { display: 'none' }}>{JSON.stringify(this.props.userData.info) !== '{}' && this.props.userData.info.nickname}</span>
                <Modal
                    title="注册"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <WrappedRegistrationForm handleCancel={this.handleCancel} />
                </Modal>
            </React.Fragment>
        )
    }
}