import "react"
import { connect } from "react-redux"
import BarGraph from './BarGraph.component'
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


const BarGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BarGraph)

export default BarGraphWithRedux