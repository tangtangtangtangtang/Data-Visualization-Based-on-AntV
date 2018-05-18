import "react";
import { connect } from "react-redux"
import ExhibitionTable from "./ExhibitionTable.component"
import { CSVDataAction, JSONDataAction, allocationAction, graphMangerAction, keysAction } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCSVDataChange: (type, value) => dispatch(CSVDataAction(type, value)),
        onJSONDataChange: (type, value) => dispatch(JSONDataAction(type, value)),
        onAllocationChange: (type, value) => dispatch(allocationAction(type, value)),
        onGraphManger: (type, value) => dispatch(graphMangerAction(type, value)),
        onKeysChange: (type, value) => dispatch(keysAction(type, value))
    }
}

const ExihibitionWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExhibitionTable)

export default ExihibitionWithRedux