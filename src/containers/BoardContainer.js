import { connect } from 'react-redux';
import TrelloListBoard from '../components/TrelloListBoard';

const mapStateToProps = (state) => ({
    list: state.lists.get('list')
});

const mapDispatchToProps = (dispatch) => ({
});

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloListBoard)

export default BoardContainer;