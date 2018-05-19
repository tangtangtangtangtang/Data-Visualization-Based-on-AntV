import deepClone from 'lodash.clonedeep'
import { UPDATEDATA, CLEARDATA } from '../actions/actionType'
import { csvParse } from 'd3-dsv'
const csvData = (state = {
    data: '',
    start: '',
    end: '',
    xAxis: '',
    yAxis: '',
    keys: [],
}, action) => {
    let result = deepClone(state)
    switch (action.type) {
        case UPDATEDATA:
            //data    
            if (typeof action.value === 'string') {
                result.data = csvParse(action.value)
            } else {
                result.data = action.value
            }
            //keys
            result.keys = Object.keys(result.data[0])
            //start,end slider
            result.start = result.data[0][result.keys[0]]
            result.end = result.data.slice(-1, )[0][result.keys[0]]
            result.xAxis = result.keys[0];
            result.yAxis = result.keys[1];
            break;
        case CLEARDATA:
            result.data = '';
            result.start = '';
            result.end = '';
            result.keys = [];
            break;
        default:
            return state;
    }
    return result
}

export default csvData