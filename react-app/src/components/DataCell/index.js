import "react"
import { connect } from "react-redux"
import dataCell from './dataCell.component'
import { changeCellValueAction, changeJSONDataAction, updateCSVData, graphSourceOrAllocationChanged, updateKeys } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        excelData: state.excelData.data,
        JSONData: state.JSONData,
        chart: state.chart.chart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCellValueChange: (id, value) => dispatch(changeCellValueAction(id, value)),
        onJSONDataChange: (value) => dispatch(changeJSONDataAction(value)),
        onUpdateCSVData: (value, fileName) => dispatch(updateCSVData(value, fileName)),
        onGrpahManger: (type) => dispatch(graphSourceOrAllocationChanged(type)),
        onUpdateKeys: (value) => dispatch(updateKeys(value))
    }
}


const dataCellWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(dataCell)

export default dataCellWithRedux