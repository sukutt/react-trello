import { connect } from 'react-redux';
import TrelloCard from '../components/TrelloCard';
import { editCard } from '../store/modules/Lists';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    onEditCard: (params) => dispatch(editCard(params)),
});

const TrelloCardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloCard)

export default TrelloCardContainer;