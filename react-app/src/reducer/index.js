/**
 * Created by tang on 18/3/8.
 */
import { combineReducers } from "redux"
import usrData from "./usrData"
import allocation from './allocation'
import chart from './chart'
import { excelData, JSONData } from './excelData'
import expandOrNot from "./expandManger";
const reducer = combineReducers({
    usrData,
    excelData,
    JSONData,
    allocation,
    chart,
    expandOrNot
})

export default reducer