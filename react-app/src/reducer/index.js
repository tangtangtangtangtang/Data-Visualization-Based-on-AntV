/**
 * Created by tang on 18/3/8.
 */
import {combineReducers} from "redux"
import usrData from "./usrData"
import other from "./other"

 const reducer = combineReducers({
     usrData,
     other
 })

 export default reducer