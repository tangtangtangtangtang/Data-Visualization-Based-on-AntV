import "react"
import { connect } from "react-redux"
import LogIn from './Login.component'
import { userAction } from '../../actions/index'

const mapStateToProps = (state, props) => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateUserInfo: (type, value) => dispatch(userAction(type, value))
    }
}


const LogInWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogIn)

export default LogInWithRedux