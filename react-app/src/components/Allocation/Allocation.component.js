/**
 * Created by tang on 18/3/6.
 */
// import AreaGraph from './AreaGraph/AreaGraphAllocation.comoponent'
// import BoxGraph from './BoxGraph/BoxGraphAllocation.comoponent'
// import BarGraph from './BarGraph/BarGraphAllocation.comoponent'
import LineGraph from '../Graph/LineGraph/index'
import React, { Component } from "react";
import { Row, Col } from "antd";
//各种allocation
import DataCellTable from "../DataCell/index";
import GeomAllocation from './GeomAllocation/index'
import MyUpload from '../MyUpload/MyUpload.component'
// import allocationConfig from './config'
// const Option = Select.Option

export default class graphContainer extends Component {
    constructor(props) {
        super(props);
        this.allocationChange = this.allocationChange.bind(this)
        this.state = {
            onlineEdit: false,
        }
    }

    allocationChange(value, ele) {
        this.props.onAllocationChangeKinds(ele.props.id, value)
    }

    render() {
        const all = {
            // AreaGraph: <AreaGraph allocation={this.props.allocation} />,
            // BoxGraph: <BoxGraph allocation={this.props.allocation} />,
            // BarGraph: <BarGraph allocation={this.props.allocation} />,
            LineGraph: <LineGraph allocation={this.props.allocation} />,
        }
        const type = all[window.location.hash.replace("#", "")];
        // const kindsConfig = allocationConfig[window.location.hash.replace("#", "")]
        return (
            <React.Fragment>
                <Row>
                    {/* <Col span={4}>
                        <Select onChange={this.allocationChange} defaultValue={"base"} style={{ width: 140 }}>
                            {kindsConfig.map(item => {
                                return <Option id="kinds" value={item.key}>{item.value}</Option>
                            })}
                        </Select>
                    </Col> */}
                    <Col span={4}>
                        <MyUpload />
                    </Col>
                </Row>
                <Row>
                    <Col span={20}>
                        {type}
                    </Col>
                </Row>
                <GeomAllocation />
                <DataCellTable />
            </React.Fragment>
        )
    }
}