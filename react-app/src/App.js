import React, {Component} from "react";
import "./App.less";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Layout} from "antd";
import MyHeader from "./components/Header";
import MySider from "./components/Sider";
import AppContent from "./router/router";
import { createStore } from 'redux'
import {Provider} from "react-redux";
import reducer from "./reducer"
const {Content, Footer} = Layout

class App extends Component {

  render() {
    let store = createStore(reducer)
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Route path="/" component={MyHeader}></Route>
            <Layout>
              <Route path="/:channel" component={MySider}></Route>
              <Content>
                <AppContent></AppContent>
              </Content>
            </Layout>
            <Footer style={{height: "200px"}}></Footer>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
