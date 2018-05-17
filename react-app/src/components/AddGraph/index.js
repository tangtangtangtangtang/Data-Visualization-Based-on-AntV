import "react"
import { connect } from "react-redux"
import AddGraph from './AddGraph.component'
import { JSONDataAction, CSVDataAction, allocationAction, graphMangerAction } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCSVDataChange: (type, value) => dispatch(CSVDataAction(type, value)),
        onJSONDataChange: (type, value) => dispatch(JSONDataAction(type, value)),
        onAllocationChange: (type, value) => dispatch(allocationAction(type, value)),
        onGraphManger: (type, value) => dispatch(graphMangerAction(type, value))
    }
}


const AddGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddGraph)

export default AddGraphWithRedux