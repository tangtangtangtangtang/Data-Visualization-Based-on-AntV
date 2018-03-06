/**
 * Created by tang on 18/3/5.
 */
import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {Breadcrumb, Layout} from "antd";

export default class AppRoutes extends Component{

  render(){
    let routes = [];

    return (
      <Route exact path="/"
             render={()=>(<Redirect to="/document"></Redirect>)}>
      </Route>
    )
  }
}

