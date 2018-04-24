
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
    let result = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "cellValueChange":
            cellValueChange(result.data, action)
            break;
        case "keyValueChange":
            result.key = [];
            result.data[0].forEach(item => {
                if (item) {
                    result.key.push(item)
                }
            })
            break;
        default:
            break;
    }
    return result;
}

export const JSONData = (state = [], action) => {
    let result;
    switch (action.type) {
        case "updateJSONData":
            result = action.value
            break;
        case "getJSONData":
            result = state
            break;
        default:
            result = state
            break;
    }
    return result
}