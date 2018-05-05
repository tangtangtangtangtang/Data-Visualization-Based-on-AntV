import { UPDATEUSERGRAPH, UPDATEUSERINFO, CLEARUSERGRAPH, CLEARUSERINFO } from '../actions/actionType'
import deepClone from 'lodash.clonedeep'
const usrData = (state = {
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
        case CLEARUSERGRAPH:
            result.graphData = [];
            break;
        case CLEARUSERINFO:
            result.info = {};
            break;
        default:
            return result;
    }
    return result
}

export default usrData