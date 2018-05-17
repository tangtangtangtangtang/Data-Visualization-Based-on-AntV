import deepClone from 'lodash.clonedeep'
import { UPDATECSVDATA, CLEARCSVDATA } from '../actions/actionType'
const csvData = (state = {
    data: '',
    fileName: '',
}, action) => {
    let result = deepClone(state)
    switch (action.type) {
        case UPDATECSVDATA:
            result.data = action.value;
            result.fileName = action.fileName;
            break;
        case CLEARCSVDATA:
            result.data = '';
            result.fileName = '';
            break;
        default:
            return state;
    }
    return result
}

export default csvData