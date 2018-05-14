import "react";
import { connect } from "react-redux"
import ExhibitionTable from "./ExhibitionTable.component"

const mapStateToProps = (state, props) => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCardClick: (id) => {

        },
        onCardEdit: (id) => {

        }
    }
}

const ExihibitionWithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExhibitionTable)

export default ExihibitionWithRedux