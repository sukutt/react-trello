import { connect } from 'react-redux';
import TrelloLists from '../components/TrelloLists';
import { confirmNewBoard } from '../store/modules/Lists';

const mapStateToProps = (state) => ({
    list: state.lists.get('list'),
});

const mapDispatchToProps = (dispatch) => ({
    onConfirmNewBoard: (content) => dispatch(confirmNewBoard({title: content})),
});

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloLists)

export default ListContainer;