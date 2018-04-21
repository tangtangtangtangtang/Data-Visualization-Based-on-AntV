/**
 * Created by tang on 18/3/8.
 */

export const changeCellValueAction = (id, value) => ({
    type: "cellValueChange",
    x: parseInt(id.split("-")[0], 10),
    y: parseInt(id.split("-")[1], 10),
    value: value,
})

export const changeKeyValueAction = {
    type: "keyValueChange"
}

export const changeJSONDataAction = (value) => ({
    type: "update",
    value: value
})

export const getJSONDataAction = {
    type: "get"
}