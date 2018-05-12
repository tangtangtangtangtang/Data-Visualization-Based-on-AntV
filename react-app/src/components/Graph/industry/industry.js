import store from '../../../store';
import deepClone from 'lodash.clonedeep'
import { KEYSFROMCVS } from '../../../actions/actionType'
//图像attr
export default {
    keys: (type) => {
        let result;
        switch (type) {
            case KEYSFROMCVS:
                result = store.getState().keys
                break;
            default:
                result = store.getState().keys;
                break;
        }
        return result;
    },
    dv: (type) => {
        let result, states = store.getState();
        switch (type) {
            case KEYSFROMCVS:
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
        console.log('transform')
        let states = store.getState();
        keys = deepClone(keys)
        switch (method) {
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
