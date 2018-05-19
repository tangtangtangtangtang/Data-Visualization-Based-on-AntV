/**
 * Created by tang on 18/3/7.
 */
import React, { Component } from "react";
import { Modal, Icon, Card } from "antd";
import "./AddGraph.component.less"
import { Link } from "react-router-dom";
import { CLEARDATA, CLEARMANGER, CLEARALLOCATION } from '../../actions/actionType'

export default class AddGraph extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    this.state = {
      visible: false,
    }
  }

  showModal() {
    this.setState({
      visible: true
    })
  }

  handleCancel() {
    this.setState({
      visible: false
    }
    )
  }

  handleOk() {
    this.setState({
      visible: false
    })
  }

  handleCardClick(e) {
    //清除数据
    this.props.onDataChange(CLEARDATA);
    this.props.onAllocationChange(CLEARALLOCATION);
    this.props.onGraphManger(CLEARMANGER)
    this.setState({
      visible: false
    })
  }

  render() {
    const GraphType = [
      {
        key: "BarGraph",
        content: "柱状图",
        src: require("./BarGraph.png"),
      },
      {
        key: "LineGraph",
        content: "折线图",
        src: require("./LineGraph.png"),
      },
      {
        key: "PieGraph",
        content: "饼图",
        src: require("./PieGraph.png"),
      },
      {
        key: "PointGraph",
        content: "散点图",
        src: require("./PointGraph.png"),
      }, {
        key: 'AreaGraph',
        content: '面积图',
        src: require('./AreaGraph.png')
      }
      // {
      //   key: "CandleGraph",
      //   content: "烛形图",
      //   src: require("./candle.png"),
      // },
    ]

    return (
      <div>
        <span onClick={this.showModal}><Icon type="plus-circle-o" style={{ margin: "0 auto" }} /></span>
        <Modal
          width={"80vw"}
          title={"Basic"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.visible}
        >
          {
            GraphType.map(item =>
              <Link to={{
                pathname: "/add/graph",
                hash: item.key
              }} key={item.key}>
                <Card className="my-card"
                  hoverable
                  style={{ width: '30%', height: 207 }}
                  cover={<img style={{ width: "100%", height: '140px' }} alt={item.key} src={item.src} />}
                  key={item.key}
                  onClick={this.handleCardClick}
                >
                  {item.content}
                </Card>
              </Link>
            )
          }
        </Modal>
      </div>
    )
  }
}