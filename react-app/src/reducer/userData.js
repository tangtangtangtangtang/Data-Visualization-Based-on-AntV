import { UPDATEUSERGRAPH, UPDATEUSERINFO, CLEARUSERINFO } from '../actions/actionType'
import deepClone from 'lodash.clonedeep'
const userData = (state = {
    info: {},
    graphData: []
}, action) => {
    let result = deepClone(state)
    switch (action.type) {
        case UPDATEUSERGRAPH:
            result.graphData = action.value;
            break;
        case UPDATEUSERINFO:
            result.info = action.value;
            break;
        case CLEARUSERINFO:
            result.info = {};
            result.graphData = [];
            break;
        default:
            return result;
    }
    return result
}

export default userData