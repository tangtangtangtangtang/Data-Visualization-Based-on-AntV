/**
 * Created by tang on 18/3/7.
 */
import React, {Component} from "react";
import {Modal, Icon, Card} from "antd";
import "./AddGraph.component.less";

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
    this.setState({
      visible: false
    })
  }

  render() {
    const GraphType = [
      {
        key: "BarGraph",
        content: "柱状图",
        src: "../../public/image/bar.png",
      },
      {
        key: "LineGraph",
        content: "折线图",
        src: "../../public/image/line.png",
      },
      {
        key: "PieGraph",
        content: "饼图",
        src: "../../public/image/pie.png",
      },
      {
        key: "PointGraph",
        content: "散点图",
        src: "../../public/image/point.png",
      },
      {
        key: "CandleGraph",
        content: "烛形图",
        src: "../../public/image/candle.png",
      },
    ]

    return (
      <div>
        <span onClick={this.showModal}><Icon type="plus-circle-o" style={{margin:"0 auto"}}/></span>
        <Modal
          width={"80vw"}
          title={"Basic"}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.visible}
        >
          {
            GraphType.map(item =>
              <Card className="my-card"
                    hoverable
                    style={{width: 240}}
                    cover={<img alt={item.key} src={item.src}/>}
                    key={item.key}
                    onClick={this.handleCardClick}
              >
                {item.content}
              </Card>
            )
          }
        </Modal>
      </div>
    )
  }
}