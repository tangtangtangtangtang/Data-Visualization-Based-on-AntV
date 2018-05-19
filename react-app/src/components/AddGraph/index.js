import "react"
import { connect } from "react-redux"
import AddGraph from './AddGraph.component'
import { dataAction, allocationAction, graphMangerAction } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDataChange: (type, value) => dispatch(dataAction(type, value)),
        onAllocationChange: (type, value) => dispatch(allocationAction(type, value)),
        onGraphManger: (type, value) => dispatch(graphMangerAction(type, value))
    }
}


const AddGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddGraph)

export default AddGraphWithRedux