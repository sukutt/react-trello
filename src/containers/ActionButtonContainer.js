import { connect } from 'react-redux';
import TrelloActionButton from '../components/TrelloActionButton';
import { changeContent, reset, addBoard, cancelAddingBoard} from '../store/modules/ActionButton';
import { addCard, confirmNewCard, cancelAddingCard  } from '../store/modules/Lists';

const mapStateToProps = (state) => ({
    content: state.actionButton.get('content'),
    boardFormOpen: state.actionButton.get('boardFormOpen')
});

const mapDispatchToProps = (dispatch) => ({
    onConfirmNewCard: (id, content) => dispatch(confirmNewCard({id, content})),
    onChangeContent: (content) => dispatch(changeContent({content,})),
    onReset: () => dispatch(reset()),
    onAddCard: (id) => dispatch(addCard({id,})),
    onAddBoard: () => dispatch(addBoard()),
    onCancelAddingBoard: () => dispatch(cancelAddingBoard()),
    onCancelAddingCard: (id) => dispatch(cancelAddingCard({id})),
});

const ActionButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloActionButton)

export default ActionButtonContainer;