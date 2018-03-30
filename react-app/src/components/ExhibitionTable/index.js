import "react";
import { connect } from "react-redux"
import ExhibitionTable from "./ExhibitionTable.component"

const mapStateToProps = (state, props) => {
    return {
        data: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCardClick: (id) => {

        },
        onCardEdit: (id) =>{

        }
    }
}

const Exihibition = connect(
    mapDispatchToProps,
    mapStateToProps
)(ExhibitionTable)

export default Exihibition