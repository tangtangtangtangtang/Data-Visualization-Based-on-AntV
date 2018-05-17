import "react"
import { connect } from "react-redux"
import LineGraph from './LineGraph.component'
import { chartAction } from '../../../actions/index'

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
        onChartChange: (type, value) => dispatch(chartAction(type, value)),
    }
}


const LineGraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LineGraph)

export default LineGraphWithRedux