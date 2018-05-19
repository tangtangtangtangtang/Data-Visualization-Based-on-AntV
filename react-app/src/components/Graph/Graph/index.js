import "react"
import { connect } from "react-redux"
import Graph from './Graph.component'
import { chartAction } from '../../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        chart: state.chart,
        graphManger: state.graphManger,
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChartChange: (type, value) => dispatch(chartAction(type, value)),
    }
}


const GraphWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Graph)

export default GraphWithRedux