/**
 * Created by charles on 2018/1/16.
 */
import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {Layout, Menu} from "antd";
import "./Header.component.less";

const {Header} = Layout;

export class MyHeader extends Component {
  
  render() {

    return (
      <Header className="MyHeader">
        <div className="logo">
          Data Visualization
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: '64px' ,height:"100%", border:"none"}}
        >
          <Menu.Item key="2"><Link to={"/online"}>{"在线使用"}</Link></Menu.Item>
          <Menu.Item key="3"><Link to={"/import"}>{"导入使用"}</Link></Menu.Item>
          <Menu.Item key="4"><Link to={"/document"}>{"使用帮助"}</Link></Menu.Item>
        </Menu>
      </Header>
    );
  }
}