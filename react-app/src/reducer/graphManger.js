import deepClone from 'lodash.clonedeep'
import { JSONDATACHANGED, ALLOCATIONCHANGED, GRAPHIDCHANGED, GRAPHNAMECHANGED, CSVFILECHANGED, CLEARMANGER, INITMANGER } from '../actions/actionType'

const chart = (state = {
    JSONData: false,
    csv: false,
    allocation: false,
    name: '未定义',
    _id: '',
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
        case INITMANGER:
            result = action.value
            break;
        case CLEARMANGER:
            result = {
                JSONData: false,
                csv: false,
                allocation: false,
                name: '未定义',
                _id: '',
            }
            break;
        case GRAPHNAMECHANGED:
            result.name = action.value
            break;
        case GRAPHIDCHANGED:
            result._id = action.value
            break;
        default:
            return state;
    }
    return result
}

export default chart