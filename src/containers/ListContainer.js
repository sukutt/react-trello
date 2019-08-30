import { connect } from 'react-redux';
import TrelloLists from '../components/TrelloLists';
import { addCard } from '../store/modules/Lists';

const mapStateToProps = (state) => ({
    list: state.lists.get('list')
});

const mapDispatchToProps = (dispatch) => ({
    onAddCard: (id) => dispatch(addCard({id}))
});

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloLists)

export default ListContainer;