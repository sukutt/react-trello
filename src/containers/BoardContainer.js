import { connect } from 'react-redux';
import TrelloListBoard from '../components/TrelloListBoard';

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = (state) => ({
});

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloListBoard)

export default BoardContainer;