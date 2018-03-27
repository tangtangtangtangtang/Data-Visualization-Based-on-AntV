/**
 * Created by charles on 2018/1/16.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Layout, Menu, Row, Col} from "antd";
import "./Header.component.less";
import AddGraph from "../AddGraph/AddGraph.component";

const {Header} = Layout;

export class MyHeader extends Component {

  constructor(props) {
    super(props);
    this.handleAddClik=this.handleAddClik.bind(this)
    this.state = {
      add:false
    }
  }

  handleAddClik() {
    this.setState({
      add:true
    })
  }

  render() {

    return (
      <Header className="MyHeader">
        <Row>
          <Col span={6}>
            <div className="logo">
              Data Visualization
            </div>
          </Col>
          <Col span={18}>
            <Menu
              mode="horizontal"
              theme="light"
              style={{lineHeight: '64px', height: "100%", border: "none", float: "right"}}
            >
              <Menu.Item key="1" onClick={this.handleAddClik}><AddGraph trigger={this.state.add}/></Menu.Item>
              <Menu.Item keu="0"><Link to={"/main"} >{"主页"}</Link></Menu.Item> 
              <Menu.Item key="4"><Link to={"/document"}>{"使用帮助"}</Link></Menu.Item>
            </Menu>
          </Col>

        </Row>

      </Header>
    );
  }
}