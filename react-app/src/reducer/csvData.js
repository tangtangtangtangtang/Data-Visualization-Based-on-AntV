import deepClone from 'lodash.clonedeep'
import { UPDATECSVDATA } from '../actions/actionType'
const csvData = (state = {
    data: "",
    keys: []
}, action) => {
    let result = deepClone(state)
    switch (action.type) {
        case UPDATECSVDATA:
            result.data = action.value;
            result.keys = action.value.split('\n')[0].split(',')
            break;
        default:
            return state;
    }
    return result
}

export default csvData