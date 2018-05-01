/**
 * Created by tang on 18/3/6.
 */

import BarGraph from '../Graph/BarGraph/index'
import LineGraph from '../Graph/LineGraph/index'
import React, { Component } from "react";
import { Row, Col } from "antd";
//各种allocation
import DataCellTable from "../DataCell/index";
import GeomAllocation from './GeomAllocation/index'

export default class graphContainer extends Component {
    render() {
        // const all = {
        //     // AreaGraph: <AreaGraph allocation={this.props.allocation} />,
        //     // BoxGraph: <BoxGraph allocation={this.props.allocation} />,
        //     BarGraph: <BarGraph allocation={this.props.allocation} />,
        //     LineGraph: <LineGraph allocation={this.props.allocation} />,
        // }
        // const type = all[window.location.hash.replace("#", "")];
        // const kindsConfig = allocationConfig[window.location.hash.replace("#", "")]
        return (
            <React.Fragment>
                <Row>
                    <Col span={20}>
                        <LineGraph allocation={this.props.allocation} />
                    </Col>
                </Row>
                <GeomAllocation graphType={window.location.hash.replace("#", "")} />
                <DataCellTable />
            </React.Fragment>
        )
    }
}