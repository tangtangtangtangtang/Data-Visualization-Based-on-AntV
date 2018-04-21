/**
 * Created by tang on 18/3/8.
 */
import { combineReducers } from "redux"
import usrData from "./usrData"
import other from "./other"
import { excelData, JSONData } from './excelData'

const reducer = combineReducers({
    usrData,
    other,
    excelData,
    JSONData
})

export default reducer