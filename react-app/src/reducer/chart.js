import { UPDATECHART, UPDATEDS, UPDATEDV } from '../actions/actionType'

const chart = (state = {
    chart: {},
    ds: {},
    dv: {}
}, action) => {
    let result = state
    switch (action.type) {
        case UPDATECHART:
            result.chart = action.value;
            break;
        case UPDATEDS:
            result.ds = action.value;
            break;
        case UPDATEDV:
            result.dv = action.value;
            break;
        case "deleteChart":
            result.chart = {};
            break;
        default:
            return state;
    }
    return result
}

export default chart