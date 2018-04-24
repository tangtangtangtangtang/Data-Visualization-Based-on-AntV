const chart = (state = {}, action) => {
    let result = {};
    switch (action.type) {
        case "updateChart":
            result = action.value;
            break;
        case "deleteChart":
            result = {};
            break;
        default:
            return state;
    }
    return result
}

export default chart