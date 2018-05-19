import store from '../../../store';
import deepClone from 'lodash.clonedeep'
import G2 from '@antv/g2'
export default {
    keys: () => {
        let result = store.getState().data.keys;
        return result;
    },
    ds(type, action) {
        let states = store.getState();
        switch (type) {
            case 'sliderState':
                let start = action ? action.startValue : states.data.start;
                let end = action ? action.endValue : states.data.end;
                states.chart.ds.setState('start', start);
                states.chart.ds.setState('end', end);
                break;
            default:
                break;
        }
    },
    dv: () => {
        let result, states = store.getState();
        result = states.chart.ds.createView('normal').source(states.data.data);
        return result;
    },
    transform: (method, option) => {
        //keys
        let states = store.getState();
        let keys = deepClone(option ? option.keys : '')
        switch (method) {
            case 'filterSlider':
                states.chart.dv.transform({
                    type: 'filter',
                    callback(row) {
                        return row[states.data.xAxis] >= states.chart.ds.state.start && row[states.data.xAxis] <= states.chart.ds.state.end
                    }
                })
                break;
            case 'mapToFloat':
                let field = option.field;
                states.chart.dv.transform({
                    type: 'map',
                    callback(row) {
                        for (let i in row) {
                            if (i !== field) {
                                continue
                            }
                            if (typeof row[i] === 'string') {
                                row[i] = row[i].trim()
                            }
                            if (/^(\-)?\d+(\.\d{0,})?$/.test(row[i])) {
                                row[i] = parseFloat(row[i])
                            }
                        }
                        return row
                    },
                })
                break;
            case "fold":
                let fields = keys.slice(1, );
                states.chart.dv.transform({
                    type: method,
                    key: "key",
                    value: keys[1],
                    fields,
                    retains: [keys[0]]
                })
                keys = [keys[0], keys[1], 'key']
                break;
            case 'percent':
                states.chart.dv.transform({
                    type: 'percent',
                    field: keys[1],
                    dimension: keys[0],
                    groupBy: [keys[2]],
                    as: 'percent'
                });
                break;
            default:
                break;
        }
        //返回一个变化后的Keys x轴、y1轴与区分key
        return keys;
    },
    scale: () => {
        let states = store.getState()
        for (let i in states.allocation.scale) {
            let allocationObject = states.allocation.scale[i]
            //todo 最大值小于最小值的限定s
            states.chart.chart.scale(i, {
                min: allocationObject.min,
                max: allocationObject.max,
                type: allocationObject.type,
                // formatter: (val) => { return val + "xxxx" }
            })
        }
    },
    tooltip: (chart) => {

    },
    //坐标轴操作
    coord: () => {

    },
    //shape
    shape: (type) => {
        function getTextAttrs(cfg) {
            return Object.assign({}, {
                fillOpacity: cfg.opacity,
                fontSize: cfg.origin._origin.size,
                rotate: cfg.origin._origin.rotate,
                text: cfg.origin._origin.text,
                textAlign: 'center',
                fontFamily: cfg.origin._origin.font,
                fill: cfg.color,
                textBaseline: 'Alphabetic'
            }, cfg.style);
        }
        switch (type) {
            case 'WordCloud':
                G2.Shape.registerShape('point', 'cloud', {
                    drawShape: function drawShape(cfg, container) {
                        var attrs = getTextAttrs(cfg);
                        return container.addShape('text', {
                            attrs: Object.assign(attrs, {
                                x: cfg.x,
                                y: cfg.y
                            })
                        });
                    }
                });
                break;
            default:
                break;
        }
    }
}
    //scale

    //tooltip
