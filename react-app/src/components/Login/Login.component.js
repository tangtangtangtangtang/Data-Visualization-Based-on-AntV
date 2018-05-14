import React, { Component } from 'react'
import { message, Modal, Button, Form, Input, Icon } from 'antd'
import axios from 'axios'
import { CLEARUSERINFO, UPDATEUSERGRAPH, UPDATEUSERINFO } from '../../actions/actionType'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/logIn', values)
                    .then((res) => {
                        if (res.data.code) {
                            message.success(res.data.message)
                            this.props.onUpdateUserInfo(UPDATEUSERINFO, {
                                'account': res.data.account,
                                'nickname': res.data.nickname
                            })
                            this.props.onUpdateUserInfo(UPDATEUSERGRAPH, res.data.graph)
                            this.props.handleCancel();
                        } else {
                            message.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }
        });
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入账号' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )} */}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.state = {
            visible: false,
            isLogIn: false
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

    handleLogOut() {
        this.props.onUpdateUserInfo(CLEARUSERINFO)
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
        const WrappedLoginForm = Form.create()(LoginForm)

        return (
            <React.Fragment>
                {
                    this.state.isLogIn ? <Button style={{ border: "none", padding: 0, width: "100%", textAlign: "center" }} onClick={this.handleLogOut}>注销</Button> : <Button style={{ border: "none", padding: 0, width: "100%", textAlign: "center" }} onClick={this.showModal}>登陆</Button>
                }
                <Modal
                    title="登陆"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <WrappedLoginForm handleCancel={this.handleCancel} onUpdateUserInfo={this.props.onUpdateUserInfo} />
                </Modal>
            </React.Fragment>
        )
    }
}