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

let startCommon = (type) => {
    // let states = store.getState();
    // if (['PieGraph'].indexOf(type) !== -1) {
    //     industry.transform('mapToFloat', { field: i })
    // }
}

let endCommon = (type) => {
    let states = store.getState();
    let chart = states.chart.chart
    if (['LineGraph', 'BarGraph', 'PointGraph', 'AreaGraph', 'WordCloud'].indexOf(type) !== -1) {
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
    startCommon(type)
    switch (type) {
        case 'LineGraph':
            //数据操作
            if (keys.length > 2) {
                keys = industry.transform('fold', { keys });
            }
            common()
            states.chart.chart.coord('rect');
            if (states.allocation.kinds === 'hv') {
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
            states.chart.chart.coord('rect');
            if (states.allocation.kinds === 'fenzu') {
                chart.interval().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'rgb(48, 189, 115)').adjust({ type: "dodge" });
            } else if (states.allocation.kinds === 'duidie') {
                chart.intervalStack().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'rgb(48, 189, 115)');
            } else {
                chart.interval().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'rgb(48, 189, 115)');
            }
            break;
        case 'PieGraph':
            //数据操作
            industry.transform('mapToFloat', { field: keys[1] })
            industry.transform('percent', { keys })
            common();
            states.chart.chart.tooltip({
                showTitle: false,
                itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            });
            if (states.allocation.kinds === 'base') {
                states.chart.chart.coord('theta', {
                    radius: 0.75
                });
                chart.intervalStack()
                    .position('percent')
                    .color(keys[0])
                    .label('percent', {
                        formatter: (val, item) => {
                            val = (val * 100).toFixed(2) + '%';
                            return item.point[keys[0]] + ': ' + val;
                        }
                    })
                    .tooltip(`${keys[0]}*percent`, (item, percent) => {
                        percent = (percent * 100).toFixed(2) + '%';
                        return {
                            name: item,
                            value: percent
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
            } else if (states.allocation.kinds === 'circle') {
                chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.6
                });
                chart.intervalStack()
                    .position('percent')
                    .color(keys[0])
                    .label('percent', {
                        formatter: (val, item) => {
                            val = (val * 100).toFixed(2) + '%';
                            return item.point[keys[0]] + ': ' + val;
                        }
                    })
                    .tooltip(`${keys[0]}*percent`, (item, percent) => {
                        percent = (percent * 100).toFixed(2) + '%';
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
            states.chart.chart.coord('rect');
            //坐标操作
            chart.point().position(`${keys[0]}*${keys[1]}`)
                .color(`${keys[2]}`)
                .size(4)
                .opacity(0.65)
                .shape('circle')
                .tooltip(`${keys[2]}*${keys[1]}*${keys[0]}`, (gender, height, weight) => {
                    return {
                        name: gender,
                        value: height + ' , ' + weight + ''
                    };
                });
            break;
        case 'AreaGraph':
            common()
            states.chart.chart.coord('rect');
            switch (states.allocation.kinds) {
                case 'base':
                    chart.area().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'red');
                    chart.line().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : 'red').size(2);
                    break;
                case 'duidie':
                    chart.areaStack().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : '#badeff');
                    chart.lineStack().position(`${keys[0]}*${keys[1]}`).color(keys[2] ? keys[2] : '#1890ff').size(2);
                    break;
                default:
                    break;
            }
            break;
        case 'WordCloud':
            industry.shape('WordCloud');
            var range = states.chart.dv.range(keys[1]);
            var min = range[0];
            var max = range[1];
            states.chart.dv.transform({
                type: 'tag-cloud',
                fields: [keys[0], keys[1]],
                font: 'serif',
                padding: 0,
                timeInterval: 5000, // max execute time
                spiral: 'archimedean',
                fontSize: function fontSize(row) {
                    if (row[keys[1]]) {
                        return (row[keys[1]] - min) / (max - min) * (80 - 24) + 24;
                    }
                    return 0;
                },
                text(row) {
                    return row
                }
            });
            states.chart.chart.legend(false);
            states.chart.chart.axis(false);
            states.chart.chart.tooltip({
                showTitle: false
            });
            states.chart.chart.point().position(`x*y`).color('text').shape('cloud').tooltip(`${keys[0]}*${keys[1]}`);
            states.chart.chart.render();
            break;
        default:
            break;
    }
    endCommon(type)
}

export default chartType