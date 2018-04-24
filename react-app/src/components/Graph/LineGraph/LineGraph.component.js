/**
 * Created by tang on 18/3/6.
 */
import G2 from "@antv/g2";
import DateSet from "@antv/data-set"
import React, { Component } from "react";

export default class LineGraph extends Component {
  componentDidUpdate(prevProps, state) {
    //keys发生变化，需要重新绘制
    if (prevProps.keys.length > 0 && JSON.stringify(prevProps.keys) !== JSON.stringify(this.props.keys)) {
      if (this.props.chart.clear) {
        this.props.chart.clear();
      }
      this.initData();
    }
    //JSONData不一致发生变化或者配置产生变化
    if (JSON.stringify(prevProps.JSONData) !== JSON.stringify(this.props.JSONData) || JSON.stringify(prevProps.allocation) !== JSON.stringify(this.props.allocation)) {
      this.initData();
    }
  }


  componentDidMount() {
    this.props.onUpdateChart(new G2.Chart({
      container: 'chartContainer',
      forceFit: true
    }))
  }

  initData() {
    //JSON格式
    const chart = this.props.chart
    const ds = new DateSet()
    const dv = ds.createView().source(this.props.JSONData)
    //展开操作
    if (this.props.allocation.kinds.indexOf("multiple") !== -1) {

    }
    chart.source(dv);
    chart.clear();
    let keys = this.props.keys
    //scale操作
    if (true) {
      for (let i in this.props.allocation.scale) {
        let allocationObject = this.props.allocation.scale[i]
        chart.scale(i, {
          min: allocationObject.min && allocationObject.min.value,
          max: allocationObject.max && allocationObject.max.value,
          type: allocationObject.type && allocationObject.type.value,
        })
      }
    }
    //tooltip操作
    if (true) {
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
    }
    if (this.props.allocation.kinds.indexOf("hv") !== -1) {
      chart.line().position(`${keys[0]}*${keys[1]}`).shape("hv");
    } else {
      chart.line().position(`${keys[0]}*${keys[1]}`).shape("");
      chart.point().position(`${keys[0]}*${keys[1]}`).size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      });
    }
    chart.render();
    //csv格式
  }

  //mutiple


  render() {
    // const data = this.props.data
    // let {Xaxis, Yaxis} = this.props
    return (
      <div id="chartContainer"></div>
    )
  }
}