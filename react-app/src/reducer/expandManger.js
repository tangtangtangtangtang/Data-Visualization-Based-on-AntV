const expand = (state = false, action) => {
    switch (action.type) {
        case "expand":
            return true;
        case "collapse":
            return false;
        default:
            return state;
    }
}

export default expand;