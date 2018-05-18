import store from '../../../store';
import deepClone from 'lodash.clonedeep'
import { KEYSFROMCVS } from '../../../actions/actionType'
import { Switch } from 'react-router-dom';
//图像attr
export default {
    keys: () => {
        let result = store.getState().keys;
        return result;
    },

    ds(type) {
        let result, states = store.getState();
        switch (type) {
            case 'sliderState':
                states.chart.ds.setState('from', '');
                states.chart.ds.setState('to', '');
                break;

            default:
                break;
        }
    },

    dv: () => {
        let result, states = store.getState();
        let type = states.graphManger.csv
        switch (type) {
            case true:
                result = states.chart.ds.createView('normal').source(states.csvData.data, { type: 'csv', delimiter: ',' });
                break;
            default:
                result = states.chart.ds.createView("normal").source(states.JSONData.data);
                break;
        }
        return result;
    },
    transform: (method, keys) => {
        //keys
        let states = store.getState();
        keys = deepClone(keys)
        switch (method) {
            case 'filter':
                states.chart.dv.transform({
                    type: 'filter',
                    callback(row) {
                        return row
                    }
                })
                break;
            case 'mapToFloat':
                states.chart.dv.transform({
                    type: 'map',
                    callback(row) {
                        for (let i in row) {
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
                    value: 'value',
                    fields,
                })
                keys = [keys[0], 'value', 'key']
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

    }
}
    //scale

    //tooltip
