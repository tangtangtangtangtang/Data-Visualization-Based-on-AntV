/**
 * Created by tang on 18/3/6.
 */
import AreaGraph from './AreaGraph/AreaGraphAllocation.comoponent'
import BoxGraph from './BoxGraph/BoxGraphAllocation.comoponent'
import BarGraph from './BarGraph/BarGraphAllocation.comoponent'
import LineGraph from './LineGraph/LineGraphAllocation.component'
import React, { Component } from "react";
import { Upload, message, Button, Icon, Col } from 'antd';
import DataCellTable from "./DataCell/index";

export default class graphContainer extends Component {
  constructor(props) {
    super(props);
    this.editDataOnline = this.editDataOnline.bind(this)
    this.state = {
      onlineEdit: false,
    }
  }

  editDataOnline() {
    this.setState({
      onlineEdit: true
    })
  }

  render() {
    const all = {
      AreaGraph: <AreaGraph />,
      BoxGraph: <BoxGraph />,
      BarGraph: <BarGraph />,
      LineGraph: <LineGraph />,
    }
    const type = all[window.location.hash.replace("#", "")];
    return (
      <React.Fragment>
        <Col span={20}>
          {type}
        </Col>
        <DataCellTable />
      </React.Fragment>
    )
  }
}