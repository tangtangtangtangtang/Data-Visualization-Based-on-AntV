import React, { Component } from "react";
import { Card, Row, Col, Divider, Affix } from "antd"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UPDATEDATA, INITALLOCATION, INITMANGER } from '../../actions/actionType'
import './ExhibitionTable.component.less'
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
                    this.props.onDataChange(UPDATEDATA, res.data);
                    //graphmanger
                    this.props.onGraphManger(INITMANGER, {
                        JSONData: false,
                        csv: true,
                        allocation: true,
                        name: graph.name,
                        _id: graph._id,
                    });
                } else {
                    this.props.onDataChange(UPDATEDATA, res.data);
                    //graphmanger
                    this.props.onGraphManger(INITMANGER, {
                        JSONData: true,
                        csv: false,
                        allocation: true,
                        name: graph.name,
                        _id: graph.id,
                    });
                }
                //allocation
                this.props.onAllocationChange(INITALLOCATION, graph.allocation);
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let AreaGraph = [], BarGraph = [], LineGraph = [], PieGraph = [], PointGraph = []
        this.props.userData.graphData.forEach(item => {
            switch (item.graph) {
                case 'AreaGraph':
                    AreaGraph.push(item)
                    break;
                case 'PointGraph':
                    PointGraph.push(item)
                    break;
                case 'BarGraph':
                    BarGraph.push(item)
                    break;
                case 'LineGraph':
                    LineGraph.push(item)
                    break;
                case 'PieGraph':
                    PieGraph.push(item)
                    break;
                default:
                    break;
            }
        })
        let allGraph = [BarGraph, LineGraph, PieGraph, PointGraph, AreaGraph]
        let graphName = {
            BarGraph: '柱状图',
            LineGraph: '折线图',
            PieGraph: '饼图',
            PointGraph: '散点图',
            AreaGraph: '面积图'
        }
        return (
            <React.Fragment>
                <div className={'toc-affix'}>
                    <ul className={'toc'}>
                        {
                            Object.values(graphName).map(item => {
                                return <li><a href={`#${item}`}>{item}</a></li>
                            })
                        }
                    </ul>
                </div>
                {
                    allGraph.map((Graphs, index) => {
                        return <Row key={index}>
                            {
                                Graphs.length > 0 && <Divider href={`#graphName[Graphs[0].graph]`}>{graphName[Graphs[0].graph]}</Divider>
                            }
                            {
                                Graphs.map((item, index) => {
                                    let src = require(`./${item.graph}.png`);
                                    return <Col span={5} style={{ margin: '10px' }} key={item.graph + index}>
                                        <Link to={'/add/graph#' + item.graph}>
                                            < Card
                                                hoverable={true}
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
                                })
                            }
                        </Row>
                    })
                }
            </React.Fragment>
        )
    }
}