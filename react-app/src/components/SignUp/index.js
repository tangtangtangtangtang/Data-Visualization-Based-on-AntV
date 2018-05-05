import "react"
import { connect } from "react-redux"
import SignUp from './SignUp.component'

const mapStateToProps = (state, props) => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const SignUpWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUp)

export default SignUpWithRedux