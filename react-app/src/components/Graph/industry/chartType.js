import store from '../../../store';
import industry from './industry'

let common = () => {
    let states = store.getState();
    let chart = states.chart.chart;
    //坐标操作    
    chart.source(states.chart.dv);
    //scale操作
    if (JSON.stringify(states.allocation.scale) !== '{}') {
        industry.scale()
    }
}

let chartType = (type, keys) => {
    let states = store.getState();
    let chart = states.chart.chart;
    switch (type) {
        case 'LineGraph':
            //数据操作
            if (keys.length > 2) {
                keys = industry.transform('fold', keys);
            }
            common()
            if (states.allocation.kinds.indexOf("hv") !== -1) {
                chart.line().position(`${keys[0]}*${keys[1]}`).shape("hv").color(keys[2] ? keys[2] : keys[1]);
            } else {
                chart.line().position(`${keys[0]}*${keys[1]}`).shape("").color(keys[2] ? keys[2] : keys[1]);
                chart.point().position(`${keys[0]}*${keys[1]}`).size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
            }
            break;
        case 'BarGraph':
            //数据操作
            if (keys.length > 2) {
                keys = industry.transform('fold', keys);
            }
            common();
            if (states.allocation.kinds.indexOf("fenzu") !== -1) {
                chart.interval().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : keys[1]).adjust({ type: "dodge" });
            } else if (states.allocation.kinds.indexOf("duidie") !== -1) {
                chart.intervalStack().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : keys[1]);
            } else {
                chart.interval().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : keys[1]);
            }
            break;
        case 'PieGraph':
            //数据操作
            industry.transform('percent', keys)
            common();
            states.chart.chart.tooltip({
                showTitle: false,
                itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            });
            if (states.allocation.kinds.indexOf('base') !== -1) {
                states.chart.chart.coord('theta', {
                    radius: 0.75
                });
                chart.intervalStack()
                    .position('percent')
                    .color(keys[0])
                    .label('percent', {
                        formatter: (val, item) => {
                            return item.point[keys[0]] + ': ' + val;
                        }
                    })
                    .tooltip(`${keys[0]}*percent`, (item, percent) => {
                        percent = percent * 100 + '%';
                        return {
                            name: item,
                            value: percent
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
            } else if (states.allocation.kinds.indexOf('circle') !== -1) {
                chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.6
                });
                chart.intervalStack()
                    .position('percent')
                    .color(keys[0])
                    .label('percent', {
                        formatter: (val, item) => {
                            return item.point[keys[0]] + ': ' + val;
                        }
                    })
                    .tooltip(`${keys[0]}*percent`, (item, percent) => {
                        percent = percent * 100 + '%';
                        return {
                            name: item,
                            value: percent
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
            }
            break;
        case 'PointGraph':
            //数据操作
            // industry.transform('percent', keys)
            common();
            //坐标操作
            chart.point().position(`${keys[0]}*${keys[1]}`)
                .color(`${keys[2]}`)
                .size(4)
                .opacity(0.65)
                .shape('circle')
                .tooltip(`${keys[2]}*${keys[1]}*${keys[0]}`, (gender, height, weight) => {
                    return {
                        name: gender,
                        value: height + '(cm), ' + weight + '(kg)'
                    };
                });
            break;
        default:
            break;
    }
}

export default chartType