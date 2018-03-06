import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Layout} from "antd";
import MyHeader from "./components/Header";
import MySider from './components/Sider'

const {Header, Sider, Content, Footer} = Layout


class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{backgroundColor:"#fff"}}>
          <Route path="/" component={MyHeader}></Route>
          <Layout>
            <Route path="/:channel" component={MySider}></Route>

            <Content style={{backgroundColor: "#fff", height: "200px"}}></Content>
          </Layout>
          <Footer style={{backgroundColor: "#fff", height: "200px"}}></Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
