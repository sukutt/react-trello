import { connect } from 'react-redux';
import TrelloActionButton from 'components/TrelloActionButton';
import { changeContent, addBoard } from 'store/modules/actionbutton';
import { addCard, confirmNewCard } from 'store/modules/lists';

const mapStateToProps = (state) => ({
    content: state.actionbutton.get('content'),
    boardFormOpen: state.actionbutton.get('boardFormOpen')
});

const mapDispatchToProps = (dispatch) => ({
    onConfirmNewCard: (id, content) => dispatch(confirmNewCard({id, content})),
    onChangeContent: (content) => dispatch(changeContent({content,})),
    onAddCard: (id, isOpen) => dispatch(addCard({id, isOpen})),
    onAddBoard: (isOpen) => dispatch(addBoard({isOpen})),
});

const ActionButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloActionButton)

export default ActionButtonContainer;