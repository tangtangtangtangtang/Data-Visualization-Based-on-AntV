/**
 * Created by tang on 18/3/6.
 */
import G2 from "@antv/g2";
import React, { Component } from "react";

export default class LineGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: {},
      data: [
        { yea: '1991', value: 3 },
        { yea: '1992', value: 4 },
        { yea: '1993', value: 3.5 },
        { yea: '1994', value: 5 },
        { yea: '1995', value: 4.9 },
        { yea: '1996', value: 6 },
        { yea: '1997', value: 7 },
        { yea: '1998', value: 9 },
        { yea: '1999', value: 13 }
      ]
    }
  }

  componentDidUpdate(prevProps, state) {
    //JSONData不一致发生变化
    if (JSON.stringify(prevProps.JSONData) !== JSON.stringify(this.props.JSONData)) {
      this.initData()
    }
    // console.log("prev", prevProps, "state", state);
  }

  componentWillMount() { }

  componentDidMount() {
    this.setState({
      chart: new G2.Chart({
        container: 'chartContainer',
        forceFit: true
      })
    }, this.initData)
  }

  initData() {
    //JSON格式
    const chart = this.state.chart
    chart.source(this.props.JSONData);
    let keys = Object.keys(this.props.JSONData[0] ? this.props.JSONData[0] : this.state.data[0])
    chart.scale(keys[1], {
      min: 0
    });
    chart.scale(keys[0], {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position(`${keys[0]}*${keys[1]}`);
    chart.point().position(`${keys[0]}*${keys[1]}`).size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
    //csv格式
  }

  render() {
    // const data = this.props.data
    // let {Xaxis, Yaxis} = this.props
    return (
      <div id="chartContainer"></div>
    )
  }
}