import "react"
import { connect } from "react-redux"
import AddGraph from './AddGraph.component'
import { JSONDataAction } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClearCSVData: (key, value) => dispatch(JSONDataAction(key, value)),
        onClearJSONData: (type) => dispatch(JSONDataAction(type))
    }
}


const AddGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddGraph)

export default AddGraphWithRedux