/**
 * Created by tang on 18/3/6.
 */
import G2 from "@antv/g2";
import DateSet from "@antv/data-set"
import React, { Component } from "react";
import { UPDATECHART, UPDATEDS, UPDATEDV, KEYSFROMCVS, KEYSFROMPROPS, CLEAR } from '../../../actions/actionType'
import industry from '../industry/industry'
import chartType from '../industry/chartType'

export default class LineGraph extends Component {
  componentDidUpdate(prevProps, state) {
    //发生变化时重置
    this.common()
  }


  componentDidMount() {
    let chart = new G2.Chart({
      container: 'chartContainer',
      forceFit: true
    });
    let ds = new DateSet();
    // let dv = ds.createView("normal");
    this.props.onChartChange(UPDATECHART, chart)
    this.props.onChartChange(UPDATEDS, ds)
    // this.props.onChartChange(UPDATEDV, dv)
    this.common()
  }

  common() {
    if (this.props.graphManger.allocation) {
      delete this.props.chart.ds.views.normal;
      let dv = industry.dv()
      this.props.onChartChange(UPDATEDV, dv)
      this.initData()
    }
  }

  slider() {

  }

  initData() {
    //slider
    industry.ds()

    let chart = this.props.chart.chart, keys
    keys = industry.keys()
    chart.clear();
    chartType(window.location.hash.replace('#', ''), keys)
    chart.render();
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