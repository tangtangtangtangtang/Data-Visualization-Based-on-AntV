const allocation = (state = {
    kinds: ["base"],
    toolTip: [],
    scale: {},
    legend: []
}, action) => {
    let result = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "updateAllocationKinds":
            result[action.key] = action.value.split(" ")
            break;
        case "updateAllocationScale":
            result.scale = action.value;
            break;
        case "flashAllocationScale":
            result.scale = {};
            break;
        case "deleteAllocation":
            for (let item in result) {
                if (item !== "scale") {
                    result[item] = []
                } else if (item === "scale") {
                    result[item] = {}
                }
            }
            break;
        default:
            return state
    }
    return result
}

export default allocation