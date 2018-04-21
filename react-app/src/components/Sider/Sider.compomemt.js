/**
 * Created by charles on 2018/1/16.
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import "./Sider.component.less";
import menuConfigs from "../../config";

const { SubMenu, ItemGroup } = Menu;
const { Sider } = Layout;

export class MySider extends Component {

  render() {
    let menuConfig = menuConfigs.find(item => item.channel === this.props.match.params.channel);
    if (this.props.match.params.channel === "add") {
      return (
        <div></div>
      )
    }
    menuConfig = menuConfig ? menuConfig : {}
    let menuItem = menuConfig.menus ? this.renderSubMenus(menuConfig.menus) : this.renderMenu(menuConfig)
    let defaultOpenKeys = menuConfig.defaultOpenKeys
    return (
      <Sider className="MySider">
        <Menu theme="light"
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
        >
          {
            menuItem
          }
        </Menu>
      </Sider>
    )
  }

  renderMenu(menu) {
    const { url } = this.props.match;
    const path = `${url}/${menu.key}`;
    return (
      <Menu.Item key={path}>
        {this.renderLink(path, menu.title, menu.icon, menu.openInNewWindow)}
      </Menu.Item>
    );
  }

  renderMenus(menu) {
    const { url } = this.props.match;
    let subTitle = menu.icon ? <span><Icon type={menu.icon} />{menu.title}</span> : menu.title;
    return (
      <SubMenu key={`${url}/${menu.key}`} title={subTitle}>
        {
          menu.items && menu.items.map(item => {
            const path = `${url}/${menu.key}/${item.key}`;
            return (
              <Menu.Item key={path}>
                {this.renderLink(path, item.title, item.openInNewWindow)}
              </Menu.Item>
            )
          })
        }
        {
          menu.groups && menu.groups.map(group => (
            <ItemGroup key={group.groupName} title={group.title}>
              {
                group.items.map(item => {
                  const path = `${url}/${menu.key}/${item.key}`;
                  return (
                    <Menu.Item key={path}>
                      {this.renderLink(path, item.title, item.openInNewWindow)}
                    </Menu.Item>
                  )
                })
              }
            </ItemGroup>
          ))
        }
      </SubMenu>
    );
  }

  renderSubMenus(subMenus) {
    return (
      subMenus.map(menu => menu.items || menu.groups ? this.renderMenus(menu) : this.renderMenu(menu))
    );
  }

  renderLink(path, title, icon, openInNewWindow) {
    if (openInNewWindow) {
      return <a href={path} target="_blank">{title}</a>;
    }
    if (icon) {
      return <Link to={path}><Icon type={icon} />{title}</Link>
    }
    return <Link to={path}>{title}</Link>;
  }
}