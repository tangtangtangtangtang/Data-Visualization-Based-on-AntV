import "react"
import { connect } from "react-redux"
import LineGraph from './LineGraph.component'
import { getJSONDataAction } from '../../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        JSONData: state.JSONData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetJSONDataAction: () => dispatch(getJSONDataAction)
    }
}


const LineGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LineGraph)

export default LineGraphWithRedux