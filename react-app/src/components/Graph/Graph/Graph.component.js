/**
 * Created by tang on 18/3/6.
 */
import G2 from "@antv/g2";
import DateSet from "@antv/data-set"
import Slider from '@antv/g2-plugin-slider'
import React, { Component } from "react";
import { UPDATECHART, UPDATEDS, UPDATEDV, UPDATESLIDER } from '../../../actions/actionType'
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
    this.props.onChartChange(UPDATECHART, chart)
    this.props.onChartChange(UPDATEDS, ds)
    this.common()
  }

  common() {
    if (this.props.graphManger.allocation && this.props.data.data.length > 0) {
      delete this.props.chart.ds.views.normal;
      let dv = industry.dv()
      this.props.onChartChange(UPDATEDV, dv)
      this.initData()
    }
  }

  slider() {
    industry.ds('sliderState');
    const slider = new Slider({
      container: 'sliderContainer',
      start: this.props.data.start,
      end: this.props.data.end,
      data: this.props.data.data,
      xAxis: this.props.data.xAxis,
      yAxis: this.props.data.yAxis,
      onChange({ startValue, endValue }) {
        industry.ds('sliderState', { startValue, endValue })
      }
    })
    this.props.onChartChange(UPDATESLIDER, slider);
  }

  initData() {
    let chart = this.props.chart.chart;
    let keys = industry.keys();
    chart.clear();
    chartType(window.location.hash.replace('#', ''), keys)
    chart.render();
    //slider
    if (['LineGraph', 'BarGraph', 'PointGraph'].indexOf(window.location.hash.replace('#', '')) !== -1 && this.props.data.data.length > 10) {
      industry.transform('filterSlider')
      Object.keys(this.props.chart.slider).length > 0 ? this.props.chart.slider.destroy() : '';
      this.slider()
      this.props.chart.slider.render();
    }
  }

  //mutiple


  render() {
    return (
      <React.Fragment>
        <div id="chartContainer"></div>
        <div id='sliderContainer'></div>
      </React.Fragment>
    )
  }
}