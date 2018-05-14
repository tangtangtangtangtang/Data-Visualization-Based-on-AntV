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
    if (this.props.graphManger.allocation) {
      //todo 需要对源发生变化和配置变化做出比较
      if (this.props.graphManger.JSONData === true) {
        //页面操作
        this.initData(KEYSFROMPROPS);
      } else if (this.props.graphManger.csv === true) {
        //文件操作
        this.initData(KEYSFROMCVS)
      } else if (this.props.graphManger.allocation === true) {
        //allocation发生变化
      }
    }
  }


  componentDidMount() {
    let chart = new G2.Chart({
      container: 'chartContainer',
      forceFit: true
    });
    let ds = new DateSet();
    let dv = ds.createView("normal");
    this.props.onUpdateChart(UPDATECHART, chart)
    this.props.onUpdateChart(UPDATEDS, ds)
    this.props.onUpdateChart(UPDATEDV, dv)
    if (this.props.graphManger.allocation) {
      //todo 需要对源发生变化和配置变化做出比较
      if (this.props.graphManger.JSONData === true) {
        //页面操作
        this.initData(KEYSFROMPROPS);
      } else if (this.props.graphManger.csv === true) {
        //文件操作
        this.initData(KEYSFROMCVS)
      } else if (this.props.graphManger.allocation === true) {
        //allocation发生变化
      }
    }
  }

  initData(type) {
    //JSON格式
    let chart = this.props.chart.chart, dv, keys
    delete this.props.chart.ds.views.normal;
    dv = industry.dv(type)
    this.props.onUpdateChart(UPDATEDV, dv)
    keys = industry.keys(type)
    chart.clear();
    chartType(window.location.hash.replace('#', ''), keys)
    chart.render();
    // this.props.onGraphManger(CLEAR)
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