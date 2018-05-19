/**
 * Created by tang on 18/3/8.
 */
import { combineReducers } from "redux"
import userData from "./userData"
import allocation from './allocation'
import chart from './chart'
import excelData from './excelData'
import expandOrNot from "./expandManger";
import graphManger from './graphManger'
import data from './data'
const reducer = combineReducers({
    userData,
    excelData,
    data,
    allocation,
    chart,
    expandOrNot,
    graphManger,

})

export default reducer