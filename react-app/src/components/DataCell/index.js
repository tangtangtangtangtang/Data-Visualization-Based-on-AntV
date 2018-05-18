import "react"
import { connect } from "react-redux"
import dataCell from './dataCell.component'
import { changeCellValueAction, JSONDataAction, CSVDataAction, graphMangerAction, keysAction } from '../../actions/index'

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

        onJSONDataChange: (type, value) => dispatch(JSONDataAction(type, value)),
        onCSVDataChange: (type, value) => dispatch(CSVDataAction(type, value)),
        onKeysChange: (type, value) => dispatch(keysAction(type, value)),

        onGrpahManger: (type) => dispatch(graphMangerAction(type)),
    }
}


const dataCellWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(dataCell)

export default dataCellWithRedux