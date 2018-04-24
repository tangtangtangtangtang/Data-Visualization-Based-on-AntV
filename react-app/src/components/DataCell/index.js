import "react"
import { connect } from "react-redux"
import dataCell from './dataCell.component'
import { changeCellValueAction, changeJSONDataAction, changeKeyValueAction } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        excelData: state.excelData.data,
        JSONData: state.JSONData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCellValueChange: (id, value) => dispatch(changeCellValueAction(id, value)),
        onJSONDataChange: (value) => dispatch(changeJSONDataAction(value)),
        onKeyValueChange: () => dispatch(changeKeyValueAction)
    }
}


const dataCellWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(dataCell)

export default dataCellWithRedux