import store from '../../../store';
import industry from './industry'

let common = () => {
    let states = store.getState();
    let chart = states.chart.chart;
    //载入数据
    chart.source(states.chart.dv);
    //scale操作
    if (JSON.stringify(states.allocation.scale) !== '{}') {
        industry.scale()
    }
}

let startCommon = () => {
    let states = store.getState();
    //根据scale的转换操作
    for (let i in states.allocation.scale) {
        let allocationObject = states.allocation.scale[i]
        //todo 最大值小于最小值的限定s
        if (['linear', 'pow', 'log'].indexOf(allocationObject.type) !== -1) {
            industry.transform('mapToFloat', { field: i })
        }
    }
}

let endCommon = (type) => {
    let states = store.getState();
    let chart = states.chart.chart
    if (['LineGraph', 'BarGraph', 'PointGraph'].indexOf(type) !== -1) {
        switch (states.allocation.coord) {
            case 'transpose':
                chart.coord().transpose()
                break;
            case 'reflect':
                chart.coord().reflect();
                break;
            case 'none':
                chart.coord();
                break;
            default:
                break;
        }
    }
}

let chartType = (type, keys) => {
    let states = store.getState();
    let chart = states.chart.chart;
    startCommon()
    switch (type) {
        case 'LineGraph':
            //数据操作
            if (keys.length > 2) {
                keys = industry.transform('fold', { keys });
            }
            common()
            if (states.allocation.kinds.indexOf("hv") !== -1) {
                chart.line().position(`${keys[0]}*${keys[1]}`).shape("hv").color(keys[2] ? keys[2] : 'rgb(48, 189, 115)');
            } else {
                chart.line().position(`${keys[0]}*${keys[1]}`).shape("").color(keys[2] ? keys[2] : 'rgb(48, 189, 115)');
                chart.point().position(`${keys[0]}*${keys[1]}`).size(4).shape('circle')
            }
            break;
        case 'BarGraph':
            //数据操作
            if (keys.length > 2) {
                keys = industry.transform('fold', { keys });
            }
            common();
            if (states.allocation.kinds.indexOf("fenzu") !== -1) {
                chart.interval().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'rgb(48, 189, 115)').adjust({ type: "dodge" });
            } else if (states.allocation.kinds.indexOf("duidie") !== -1) {
                chart.intervalStack().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'rgb(48, 189, 115)');
            } else {
                chart.interval().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'rgb(48, 189, 115)');
            }
            break;
        case 'PieGraph':
            //数据操作
            industry.transform('percent', { keys })
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
    endCommon(type)
}

export default chartType