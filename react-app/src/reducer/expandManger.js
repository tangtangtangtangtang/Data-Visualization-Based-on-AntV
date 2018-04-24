const expand = (state = {
    expand: false
}, action) => {
    let result = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "expand":
            result.expand = true;
            break;
        case "collapse":
            result.expand = false;
            break;
        default:
            break;
    }
    return result;
}

export default expand;