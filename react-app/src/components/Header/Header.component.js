/**
 * Created by charles on 2018/1/16.
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Row, Col } from "antd";
import "./Header.component.less";
import AddGraph from "../AddGraph/AddGraph.component";
import Login from '../Login/Login.component'
import SignUp from '../SignUp/SignUp.component'
const { Header } = Layout;

export class MyHeader extends Component {

  render() {

    return (
      <Header className="MyHeader">
        <Row>
          <Col span={8}>
            <div className="logo">
              Data Visualization
            </div>
          </Col>
          <Col span={12}>
            <Menu
              mode="horizontal"
              theme="light"
              style={{ lineHeight: '64px', height: "100%", border: "none", float: "right" }}
              selectedKeys={["0"]}
            >
              <Menu.Item key="1" onClick={this.handleAddClik}></Menu.Item>
              <Menu.Item keu="0"><Link to={"/main"} >{"主页"}</Link></Menu.Item>
              <Menu.Item key="4"><Link to={"/document"}>{"使用帮助"}</Link></Menu.Item>
            </Menu>
          </Col>
          <Col span={2}>
            <Button style={{ "border": "none" }} value="small" >
              <AddGraph />
            </Button>
          </Col>
          <Col span={1}>
            <SignUp />
          </Col>
          <Col span={1}>
            <Login />
          </Col>
        </Row>

      </Header>
    );
  }
}