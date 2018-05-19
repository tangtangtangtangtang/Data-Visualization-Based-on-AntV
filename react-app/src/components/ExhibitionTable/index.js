import "react";
import { connect } from "react-redux"
import ExhibitionTable from "./ExhibitionTable.component"
import { dataAction, allocationAction, graphMangerAction, } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDataChange: (type, value) => dispatch(dataAction(type, value)),
        onAllocationChange: (type, value) => dispatch(allocationAction(type, value)),
        onGraphManger: (type, value) => dispatch(graphMangerAction(type, value)),
    }
}

const ExihibitionWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExhibitionTable)

export default ExihibitionWithRedux