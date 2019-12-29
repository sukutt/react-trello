import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrelloCard from 'components/TDL/TrelloCard';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';

class TrelloCardContainer extends Component {
    handleEditCard = (text) => {
        const { 
            TDLBoardActions,
            listIndex,
            index,
        } = this.props;

        TDLBoardActions.editCard({
            listIndex,
            index,
            text
        });
    }

    render() {
        const { 
            content,
            id,
            index,
        } = this.props;

        return (
            <TrelloCard 
                handleEditCard = { this.handleEditCard }
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