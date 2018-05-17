import "react"
import { connect } from "react-redux"
import LineGraph from './LineGraph.component'
import { updateChart, graphSourceOrAllocationChanged } from '../../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        JSONData: state.JSONData,
        csvData: state.csvData,
        allocation: state.allocation,
        chart: state.chart,
        graphManger: state.graphManger,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateChart: (type, value) => dispatch(updateChart(type, value)),
        onGraphManger: (type) => dispatch(graphSourceOrAllocationChanged(type))
    }
}


const LineGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LineGraph)

export default LineGraphWithRedux