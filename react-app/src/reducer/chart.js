// import deepClone from 'lodash.clonedeep'

const chart = (state = {
    chart: {},
    ds: {},
    dv: {}
}, action) => {
    let result = state
    switch (action.type) {
        case "updateChart":
            result.chart = action.value;
            break;
        case "deleteChart":
            result.chart = {};
            break;
        case "updateds":
            result.ds = action.value;
            break;
        case "updatedv":
            result.dv = action.value;
            break;
        default:
            return state;
    }
    return result
}

export default chart