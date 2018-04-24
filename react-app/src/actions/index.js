/**
 * Created by tang on 18/3/8.
 */

export const changeCellValueAction = (id, value) => ({
    type: "cellValueChange",
    x: parseInt(id.split("-")[0], 10),
    y: parseInt(id.split("-")[1], 10),
    value,
})

export const changeKeyValueAction = {
    type: "keyValueChange"
}

export const changeJSONDataAction = (value) => ({
    type: "updateJSONData",
    value
})

export const getJSONDataAction = {
    type: "getJSONData"
}

export const changeAllocationKinds = (key, value) => ({
    type: "updateAllocationKinds",
    key,
    value
})

export const flashAllocationScale = {
    type: "flashAllocationScale",
}

export const updateAllocationScale = (key, value) => ({
    type: "updateAllocationScale",
    value,
    key,
})

export const updateChart = (value) => ({
    type: "updateChart",
    value,
})


export const expandOrNot = (expandOrNot) => ({
    type: expandOrNot
})