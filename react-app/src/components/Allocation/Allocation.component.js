/**
 * Created by tang on 18/3/6.
 */

import Graph from '../Graph/Graph/index'
import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
//各种allocation
import DataCellTable from "../DataCell/index";
import GeomAllocation from './GeomAllocation/index'
import TopSidePanel from '../TopSidePanel/TopSidePanel.component'
import ExhibitionTable from '../ExhibitionTable/index'
export default class graphContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <Divider>{this.props.graph.name}</Divider>
                <Row>
                    <Col span={20}>
                        <Graph allocation={this.props.allocation} />
                    </Col>
                </Row>
                <GeomAllocation graphType={window.location.hash.replace("#", "")} />
                <TopSidePanel IconTop="20%" color="black" content={<ExhibitionTable />} />
                <DataCellTable />
            </React.Fragment>
        )
    }
}