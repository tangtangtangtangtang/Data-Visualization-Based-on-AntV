import "react"
import { connect } from "react-redux"
import GeomAllocation from './GeomAllocation.component'
import { allocationAction, graphMangerAction } from '../../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        allocation: state.allocation,
        keys: state.data.keys,
        excelData: state.excelData.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAllocationChange: (type, value) => dispatch(allocationAction(type, value)),
        onGraphManger: (type, value) => dispatch(graphMangerAction(type, value)),
    }
}


const GeomAllocationWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(GeomAllocation)

export default GeomAllocationWithRedux