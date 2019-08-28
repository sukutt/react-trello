import { connect } from 'react-redux';
import TrelloLists from '../components/TrelloLists';

const mapStateToProps = (state) => ({
    list: state.lists.get('list')
});

const mapDispatchToProps = (dispatch) => ({
});

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloLists)

export default ListContainer;