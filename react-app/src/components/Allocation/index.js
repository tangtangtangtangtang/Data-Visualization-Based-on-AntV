import "react"
import { connect } from "react-redux"
import Allocation from './Allocation.component'
import { changeAllocationKinds } from '../../actions/index'

const mapStateToProps = (state, props) => {
  return {
    allocation: state.allocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAllocationChangeKinds: (key, value) => dispatch(changeAllocationKinds(key, value))
  }
}


const dataCellWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Allocation)

export default dataCellWithRedux