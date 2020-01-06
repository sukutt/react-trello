import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tdlBoardActions from 'store/modules/lists';
import styled from 'styled-components';
import TrelloCardContainer from 'containers/TDL/TrelloCardContainer';
import * as buttonActions from 'store/modules/actionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { CreateCardButton } from 'components/TDL';

const HeaderDiv = styled.div`
    padding: 8px;
    font-weight: 600;
    font-size: 16px;
`;

const CardDiv = styled.div`
    padding: 0px 8px 0px 8px;
`;

const BoardWrapper = styled.div`
    width: 280px;
    height: 100%;
    margin-right: 8px;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;

    &:first-child {
        margin-left: 8px;
    }
`;

const BoardDiv = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
`;

class TrelloBoardContainer extends Component {
    handleConfirmNewCard = (content) => {
        const { TDLBoardActions, id } = this.props;
        TDLBoardActions.confirmNewCard({
            listId: id,
            content
        });
    }

    render() {
        const {
            title,
            id,
            cards,
            index: listIndex,
        } = this.props;

        const {
            handleConfirmNewCard,
        } = this;

        const jsxList = cards.map((item, index) => {
            return (
                <TrelloCardContainer
                content={item.get('content')}
                listIndex={listIndex}
                key={item.get('_id')}
                id={item.get('_id')}
                index={index}
                />
            )
        });

        return (
            <BoardWrapper>
                <Draggable draggableId={String(id)} index={listIndex}>
                    {provided => (
                        <BoardDiv
                        {...provided.draggableProps} 
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}>
                            <Droppable droppableId={String(id)}>
                                {provided => (
                                    <div{...provided.droppableProps} 
                                    ref={provided.innerRef}
                                    >
                                        <CardDiv>
                                            <HeaderDiv>{title}</HeaderDiv>
                                            {jsxList}
                                        </CardDiv>
                                        {provided.placeholder}
                                        <CreateCardButton createNewCard={handleConfirmNewCard} />
                                    </div>
                                )}
                            </Droppable>
                        </BoardDiv>
                    )}
                </Draggable>
            </BoardWrapper>
        )
    }
}

export default connect(
    (state) => ({
        lists: state.lists.get('list'),
        content: state.actionButton.get('content'),
        boardFormOpen: state.actionButton.get('boardFormOpen'),
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
        ButtonActions: bindActionCreators(buttonActions, dispatch)
    })
)(TrelloBoardContainer);

