import React, { Component } from "react";
import "./App.less";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";
import MyHeader from "./components/Header";
import MySider from "./components/Sider";
import AppContent from "./router/router";
import { Provider } from "react-redux";
import store from './store';
const { Content, Footer } = Layout

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout style={{ overflow: "hidden" }}>
            <Route path="/" component={MyHeader}></Route>
            <Layout>
              <Route path="/:channel" component={MySider}></Route>
              <Content>
                <AppContent></AppContent>
              </Content>
            </Layout>
            <Footer></Footer>
          </Layout>
        </Router>
      </Provider>
    );
  }
}