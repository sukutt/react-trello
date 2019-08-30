import { connect } from 'react-redux';
import TrelloActionButton from '../components/TrelloActionButton';
import { addCard } from '../store/modules/AddButton';

const mapStateToProps = (state) => ({
    formOpen: state.addButton.get('formOpen')
});

const mapDispatchToProps = (dispatch) => ({
    onAddCard: (id) => dispatch(addCard({id}))
});

const AddButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloActionButton)

export default AddButtonContainer;