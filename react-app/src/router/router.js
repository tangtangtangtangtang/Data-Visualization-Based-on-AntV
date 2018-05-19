/**
 * Created by tang on 18/3/5.
 */
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import menuConfigs from "../config";

export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.buildComponent = this.buildComponent.bind(this)
  }

  buildComponent(type) {
    return ""
  }

  render() {
    let routes = [];

    menuConfigs.forEach(config => {
      routes.push({
        path: `/${config.channel}`,
        component: config.component
      })
      config.menus.forEach(menu => {
        routes.push({
          path: `/${config.channel}/${menu.key || ''}`,
          component: menu.component,
          hash: '#' + menu.hash
        })
        menu.items && menu.items.forEach(segment => {
          routes.push({
            path: `/${config.channel}/${menu.key}/${segment.key || ''}`,
            component: segment.component,
            hash: '#' + segment.hash
          })
        })
      })
    })

    return (
      <div>
        {
          routes.map(route => {
            return <Route exact path={route.path}
              key={route.path + '#' + route.hash}
              component={route.component}>
            </Route>
          })
        }
        <Route exact path="/"
          render={() => (<Redirect to="/main"></Redirect>)}>
        </Route>
      </div>
    )
  }
}

