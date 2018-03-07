/**
 * Created by tang on 18/3/6.
 */
import LineGraph from '../../Graph/LineGraph/LineGraph.component'
import React, {Component} from "react";
import {Select, Layout} from "antd";
const {Sider ,Content} = Layout
const Option = Select.Option

export default class LineGraphAllocation extends Component{

  render(){

    return(
      <Layout>
        <Sider>
          <Select>
            <Option value="baseLine">基础折线图</Option>
            <Option value="mutipleLine">多条折线图</Option>
            <Option value="curveLine">曲线折线图</Option>
          </Select>
        </Sider>
        <Content>
          <LineGraph></LineGraph>
        </Content>
      </Layout>
    )
  }
}