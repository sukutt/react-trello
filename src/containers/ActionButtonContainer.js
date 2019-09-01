import { connect } from 'react-redux';
import TrelloActionButton from '../components/TrelloActionButton';
import { changeContent, reset, addBoard, cancelAddingBoard} from '../store/modules/ActionButton';

const mapStateToProps = (state) => ({
    content: state.actionButton.get('content'),
    boardFormOpen: state.actionButton.get('boardFormOpen')
});

const mapDispatchToProps = (dispatch) => ({
    onChangeContent: (content) => dispatch(changeContent({content,})),
    onReset: () => dispatch(reset()),
    onAddBoard: () => dispatch(addBoard()),
    onCancelAddingBoard: () => dispatch(cancelAddingBoard()),
});

const ActionButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloActionButton)

export default ActionButtonContainer;