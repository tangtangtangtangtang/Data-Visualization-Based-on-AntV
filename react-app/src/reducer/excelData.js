import deepClone from 'lodash.clonedeep'
import { UPDATEJSONDATA, CLEARJSONDATA } from '../actions/actionType'

let excelArray = new Array(20).fill('');
excelArray = excelArray.map(item => {
    return new Array(5).fill('')
})

const cellValueChange = (result, action) => {
    if (action.value.endsWith(`'`)) {
        result[action.x][action.y] = parseFloat(action.value)
    } else {
        result[action.x][action.y] = action.value
    }
}

export const excelData = (state = {
    data: excelArray
}, action) => {
    let result = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "cellValueChange":
            cellValueChange(result.data, action)
            break;
        default:
            break;
    }
    return result;
}

export const JSONData = (state = {
    data: [],
}, action) => {
    let result = deepClone(state);
    switch (action.type) {
        case UPDATEJSONDATA:
            result.data = action.value;
            break;
        case CLEARJSONDATA:
            result.data = [];
            break;
        default:
            result = state
            break;
    }
    return result
}