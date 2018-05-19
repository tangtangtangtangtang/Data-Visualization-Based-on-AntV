/**
 * Created by tang on 18/3/8.
 */


export const changeCellValueAction = (id, value) => ({
    type: "cellValueChange",
    x: parseInt(id.split("-")[0], 10),
    y: parseInt(id.split("-")[1], 10),
    value,
})

export const allocationAction = (type, value) => ({
    type,
    value
})

export const chartAction = (type, value) => ({
    type,
    value,
})

//data相关
export const JSONDataAction = (type, value) => ({
    type,
    value
})
export const CSVDataAction = (type, value) => ({
    type,
    value,

})
export const dataAction = (type, value) => ({
    type,
    value
})

export const graphMangerAction = (type, value) => ({
    type,
    value
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