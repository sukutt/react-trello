import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tdlBoardActions from 'store/modules/lists';
import styled from 'styled-components';
import TrelloCardContainer from 'containers/TDL/TrelloCardContainer';
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

const BoardDiv = styled.div`
    display: inline-block;
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    margin-right: 8px;
    vertical-align: top;
    white-space: nowrap;
    flex-direction: column;
    max-height: 100%;
    position: relative;

    &:first-child {
        margin-left: 8px;
    }
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
            <Draggable draggableId={id} index={listIndex}>
                {provided => (
                    <BoardDiv
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                        <Droppable droppableId={id}>
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
        )
    }
}

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
    })
)(TrelloBoardContainer);

