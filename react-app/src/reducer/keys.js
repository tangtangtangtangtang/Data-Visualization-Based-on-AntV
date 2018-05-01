import deepClone from 'lodash.clonedeep'
import { UPDATEKEYS } from '../actions/actionType'
const keys = (state = [], action) => {
    let result = deepClone(state)
    switch (action.type) {
        case UPDATEKEYS:
            result = action.value;
            break;
        default:
            return state;
    }
    return result
}

export default keys