/**
 * Created by tang on 18/3/8.
 */
import { combineReducers } from "redux"
import userData from "./userData"
import allocation from './allocation'
import chart from './chart'
import { excelData, JSONData } from './excelData'
import expandOrNot from "./expandManger";
import graphManger from './graphManger'
import csvData from './csvData'
import keys from './keys'
const reducer = combineReducers({
    userData,
    excelData,
    JSONData,
    allocation,
    chart,
    expandOrNot,
    graphManger,
    csvData,
    keys
})

export default reducer