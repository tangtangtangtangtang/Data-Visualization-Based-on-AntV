import "react"
import { connect } from "react-redux"
import dataCell from './dataCell.component'
import { changeCellValueAction, dataAction, graphMangerAction } from '../../actions/index'

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

        onDataChange: (type, value) => dispatch(dataAction(type, value)),

        onGrpahManger: (type) => dispatch(graphMangerAction(type)),
    }
}


const dataCellWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(dataCell)

export default dataCellWithRedux