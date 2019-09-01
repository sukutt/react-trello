import { connect } from 'react-redux';
import TrelloLists from '../components/TrelloLists';
import { addCard, cancelAddingCard, confirmNewCard, confirmNewBoard } from '../store/modules/Lists';

const mapStateToProps = (state) => ({
    list: state.lists.get('list'),
});

const mapDispatchToProps = (dispatch) => ({
    onAddCard: (id) => dispatch(addCard({id})),
    onCancelAddingCard: (id) => dispatch(cancelAddingCard({id})),
    onConfirmNewCard: (id, content) => dispatch(confirmNewCard({id, content})),
    onConfirmNewBoard: (content) => dispatch(confirmNewBoard({title: content})),
});

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloLists)

export default ListContainer;