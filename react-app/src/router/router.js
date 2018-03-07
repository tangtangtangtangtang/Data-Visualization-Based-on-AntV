/**
 * Created by tang on 18/3/5.
 */
import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import menuConfigs from "../config";
import Graph from "../components/Allocation";

export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.buildComponent = this.buildComponent.bind(this)
  }

  buildComponent(type) {
    return Graph[type]
  }

  render() {
    let routes = [];

    menuConfigs.forEach(config => {
      config.menus.forEach(menu => {
        routes.push({
          path: `/${config.channel}/${menu.key}`,
          component: <span className="1"></span>
        })
        menu.items && menu.items.forEach(segment => {
          routes.push({
            path: `/${config.channel}/${menu.key}/${segment.key}`,
            component: this.buildComponent(segment.key)
          })
        })

      })

    })

    return (
      <div>
        {
          routes.map(route => {
            return <Route exact path={route.path}
                          key={route.path}
                          component={route.component}>
            </Route>
          })
        }
        <Route exact path="/"
               render={()=>(<Redirect to="/main"></Redirect>)}>
        </Route>
      </div>
    )
  }
}

