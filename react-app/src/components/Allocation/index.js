import "react"
import { connect } from "react-redux"
import Allocation from './Allocation.component'

const mapStateToProps = (state, props) => {
  return {
    allocation: state.allocation,
    graph: state.graphManger
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


const AllocationWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Allocation)

export default AllocationWithRedux