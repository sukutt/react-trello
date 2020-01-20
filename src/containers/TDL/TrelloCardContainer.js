import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrelloCard from 'components/TDL/TrelloCard';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';

class TrelloCardContainer extends Component {
    handleEditCard = (text) => {
        const { 
            TDLBoardActions,
            id,
            listId
        } = this.props;

        TDLBoardActions.editCard({
            id,
            listId,
            text
        });
    }

    handleDeleteCard = () => {
        const { 
            TDLBoardActions,
            id,
            listId
        } = this.props;

        TDLBoardActions.deleteCards({
            key: 'card',
            id,
            listId,
        })
    }

    render() {
        const { 
            content,
            id, // cardId
            index,
        } = this.props;

        const {
            handleEditCard,
            handleDeleteCard,
        } = this;

        return (
            <TrelloCard 
                handleDeleteCard={handleDeleteCard}
                handleEditCard = {handleEditCard}
                content={content}
                index={index}
                id={id}
            />
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch)
    })
)(TrelloCardContainer);