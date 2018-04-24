import "react"
import { connect } from "react-redux"
import LineGraph from './LineGraph.component'
import { getJSONDataAction, updateChart } from '../../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        JSONData: state.JSONData,
        keys: state.excelData.key,
        allocation: state.allocation,
        chart: state.chart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetJSONDataAction: () => dispatch(getJSONDataAction),
        onUpdateChart: (value) => dispatch(updateChart(value))
    }
}


const LineGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LineGraph)

export default LineGraphWithRedux