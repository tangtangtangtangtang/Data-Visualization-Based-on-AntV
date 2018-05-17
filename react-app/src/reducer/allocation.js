import { UPDATEALLOCATIONKINDS, UPDATEALLOCATIONSCALE, FLASHALLOCATIONSCALE, CLEARALLOCATION } from '../actions/actionType'

const allocation = (state = {
    kinds: ["base"],
    toolTip: [],
    scale: {},
    legend: []
}, action) => {
    let result = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case UPDATEALLOCATIONKINDS:
            result.kinds = action.value.split(" ")
            break;
        case UPDATEALLOCATIONSCALE:
            result.scale = action.value;
            break;
        case FLASHALLOCATIONSCALE:
            result.scale = {};
            break;
        case CLEARALLOCATION:
            result = {
                kinds: ["base"],
                toolTip: [],
                scale: {},
                legend: []
            }
            break;
        default:
            return state
    }
    return result
}

export default allocation