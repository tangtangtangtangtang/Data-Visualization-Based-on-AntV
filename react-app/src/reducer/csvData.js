import deepClone from 'lodash.clonedeep'
import { UPDATECSVDATA, CLEARCSVDATA } from '../actions/actionType'
const csvData = (state = {
    data: '',
}, action) => {
    let result = deepClone(state)
    switch (action.type) {
        case UPDATECSVDATA:
            result.data = action.value;
            break;
        case CLEARCSVDATA:
            result.data = '';
            break;
        default:
            return state;
    }
    return result
}

export default csvData