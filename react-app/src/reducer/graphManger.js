import deepClone from 'lodash.clonedeep'
import { JSONDATACHANGED, ALLOCATIONCHANGED, CSVFILECHANGED, CLEAR } from '../actions/actionType'

const chart = (state = {
    JSONData: false,
    csv: false,
    allocation: false
}, action) => {
    let result = deepClone(state)
    switch (action.type) {
        case JSONDATACHANGED:
            result.JSONData = true;
            result.csv = false;
            result.allocation = false;
            break;
        case CSVFILECHANGED:
            result.csv = true;
            result.JSONData = false;
            result.allocation = false;
            break;
        case ALLOCATIONCHANGED:
            result.allocation = true;
            break;
        case CLEAR:
            for (let i in result) {
                result[i] = false
            }
            break;
        default:
            return state;
    }
    return result
}

export default chart