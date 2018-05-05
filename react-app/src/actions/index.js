/**
 * Created by tang on 18/3/8.
 */

import { UPDATECSVDATA, UPDATEKEYS } from './actionType'

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

export const updateAllocationScale = (value) => ({
    type: "updateAllocationScale",
    value,
})

export const updateChart = (type, value) => ({
    type,
    value,
})

export const updateCSVData = (value) => ({
    type: UPDATECSVDATA,
    value
})

export const updateKeys = (value) => ({
    type: UPDATEKEYS,
    value
})

export const graphSourceOrAllocationChanged = (type) => ({
    type
})


export const expandOrNot = (expandOrNot) => {
    return {
        type: expandOrNot ? "expand" : "collapse"
    }
}


//user相关
export const userAction = (type, value) => ({
    type,
    value
})