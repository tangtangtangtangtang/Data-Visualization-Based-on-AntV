import "react"
import { connect } from "react-redux"
import RightSidePanel from './RightSidePanel.component'
import { expandOrNot } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        expandOrNot: state.expandOrNot
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onExpandOrNot: (bool) => dispatch(expandOrNot(bool)),
    }
}


const RightSidePanelWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightSidePanel)

export default RightSidePanelWithRedux