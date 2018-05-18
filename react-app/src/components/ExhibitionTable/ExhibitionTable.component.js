import React, { Component } from "react";
import { Card, Row, Col } from "antd"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UPDATECSVDATA, UPDATEJSONDATA, INITALLOCATION, INITMANGER, UPDATEKEYS } from '../../actions/actionType'
const { Meta } = Card

export default class ExhibitionTable extends Component {
    constructor(props) {
        super(props)
        this.cardClick = this.cardClick.bind(this)
    }

    cardClick(e) {
        let graph = this.props.userData.graphData.find((item) => {
            return item._id === e.currentTarget.attributes._id.value
        })
        axios.get('/api/getFile?fileName=' + graph.fileName)
            .then((res) => {
                //data
                if (res.headers['content-type'].indexOf('csv') !== -1) {
                    this.props.onCSVDataChange(UPDATECSVDATA, res.data);
                    //graphmanger
                    this.props.onGraphManger(INITMANGER, {
                        JSONData: false,
                        csv: true,
                        allocation: true,
                        name: graph.name,
                        _id: graph._id,
                    });
                    //keys
                    this.props.onKeysChange(UPDATEKEYS, res.data.split('\n')[0].split(','))
                } else {
                    this.props.onJSONDataChange(UPDATEJSONDATA, res.data);
                    //graphmanger
                    this.props.onGraphManger(INITMANGER, {
                        JSONData: true,
                        csv: false,
                        allocation: true,
                        name: graph.name,
                        _id: graph.id,
                    });
                    //keys
                    this.props.onKeysChange(UPDATEKEYS, Object.keys(res.data[0]))
                }
                //allocation
                this.props.onAllocationChange(INITALLOCATION, graph.allocation);
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let currentType = window.location.pathname.split('/').pop()
        return (
            <Row>
                {
                    this.props.userData.graphData.map(item => {
                        let src = require(`./${item.graph}.png`);
                        if (item.graph === currentType || currentType === 'main') {
                            return <Col span={6}>
                                <Link to={'/add/graph#' + item.graph}>
                                    < Card
                                        hoverable={true}
                                        style={{ width: "200px" }}
                                        cover={<img alt={item.name} src={src} />}
                                        onClick={this.cardClick}
                                        _id={item._id}
                                    >
                                        <Meta
                                            title={item.name}
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        }
                    })
                }
            </Row >
        )
    }
}