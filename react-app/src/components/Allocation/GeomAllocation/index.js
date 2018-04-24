import "react"
import { connect } from "react-redux"
import GeomAllocation from './GeomAllocation.component'
import { changeAllocationKinds, flashAllocationScale, changeJSONDataAction, updateAllocationScale } from '../../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        allocation: state.allocation,
        keys: state.excelData.key,
        excelData: state.excelData.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAllocationChangeKinds: (key, value) => dispatch(changeAllocationKinds(key, value)),
        onFlashAllocationScale: () => dispatch(flashAllocationScale),
        onJSONDataChange: (value) => dispatch(changeJSONDataAction(value)),
        onUpdateAllocationScale: (key, value) => dispatch(updateAllocationScale(key, value)),
    }
}


const GeomAllocationWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(GeomAllocation)

export default GeomAllocationWithRedux