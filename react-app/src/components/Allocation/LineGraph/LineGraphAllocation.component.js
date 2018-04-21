/**
 * Created by tang on 18/3/6.
 */
import LineGraph from '../../Graph/LineGraph/index'
import React, { Component } from "react";
import { Select, Layout, Row, Col } from "antd";
import MyUpload from '../MyUpload.component'
const Option = Select.Option

export default class LineGraphAllocation extends Component {

  render() {
    return (
      <Layout>
        <Row>
          <Col span={4}>
            <Select defaultValue={"base"} style={{ width: 120 }}>
              <Option value="base">基础折线图</Option>
              <Option value="mutiple">多条折线图</Option>
              <Option value="curve">曲线折线图</Option>
            </Select>
          </Col>
          <Col span={4}>
            <MyUpload />
          </Col>
        </Row>
        <LineGraph></LineGraph>
      </Layout>
    )
  }
}