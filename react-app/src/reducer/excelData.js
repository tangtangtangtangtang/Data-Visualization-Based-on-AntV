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

const excelData = (state = {
    data: excelArray
}, action) => {
    let result = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "cellValueChange":
            cellValueChange(result.data, action)
            break;
        default:
            break;
    }
    return result;
}
export default excelData