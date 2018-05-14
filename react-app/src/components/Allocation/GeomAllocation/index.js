import "react"
import { connect } from "react-redux"
import GeomAllocation from './GeomAllocation.component'
import { changeAllocationKinds, flashAllocationScale, changeJSONDataAction, updateAllocationScale, graphSourceOrAllocationChanged, changeKeyValueAction } from '../../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        allocation: state.allocation,
        keys: state.keys,
        excelData: state.excelData.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAllocationChangeKinds: (key, value) => dispatch(changeAllocationKinds(key, value)),
        onFlashAllocationScale: () => dispatch(flashAllocationScale),
        onJSONDataChange: (value) => dispatch(changeJSONDataAction(value)),
        onUpdateAllocationScale: (value) => dispatch(updateAllocationScale(value)),
        onGraphManger: (type, value) => dispatch(graphSourceOrAllocationChanged(type, value)),
        onKeyValueChange: () => dispatch(changeKeyValueAction),
    }
}


const GeomAllocationWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(GeomAllocation)

export default GeomAllocationWithRedux