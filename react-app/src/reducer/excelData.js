
let excelArray = new Array(20).fill('');
excelArray = excelArray.map(item => {
    return new Array(5).fill('')
})

const cellValueChange = (result, action) => {
    if (action.value.endsWith(`'`)) {
        result[action.x][action.y] = parseFloat(action.value)
    } else {
        result[action.x][action.y] = action.value
    }
}

export const excelData = (state = { data: excelArray, key: [] }, action) => {
    let result = JSON.parse(JSON.stringify(state.data));
    let key = new Array();
    switch (action.type) {
        case "cellValueChange":
            cellValueChange(result, action)
            break;
        case "keyValueChange":
            result[0].forEach(item => {
                if (item) {
                    key.push(item)
                }
            })
            break;
        default:
            break;
    }
    return { data: result, key: key };
}

export const JSONData = (state = [], action) => {
    let result;
    switch (action.type) {
        case "update":
            result = action.value
            break;
        case "get":
            result = state
            break;
        default:
            result = state
            break;
    }
    return result
}