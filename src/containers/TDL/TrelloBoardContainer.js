import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tdlBoardActions from 'store/modules/lists';
import styled from 'styled-components';
import TrelloCardContainer from 'containers/TDL/TrelloCardContainer';
import * as buttonActions from 'store/modules/actionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { NewForm, NewActionButton } from 'components/TDL';

const HeaderDiv = styled.div`
    padding: 8px;
    font-weight: 600;
    font-size: 16px;
`;

const CardDiv = styled.div`
    padding: 0px 8px 0px 8px;
`;

const BoardDiv = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    width: 300px;
    height: 100%;
    margin-right: 8px;
`;

class TrelloBoardContainer extends Component {
    getEscapedId = (id) => {
        return Number(id.split('-')[1]);
    }

    handleOpenNewCard = (id) => {
        const { TDLBoardActions } = this.props;
        TDLBoardActions.addCard({id: this.getEscapedId(id), isOpen: true});
    }

    handleCloseNewCard = (id) => {
        const { TDLBoardActions, ButtonActions } = this.props;
        TDLBoardActions.addCard({id: this.getEscapedId(id), isOpen: false});
        ButtonActions.changeContent({content:''});
    }

    handleConfirmNewCard = (e, id) => {
        const { TDLBoardActions, ButtonActions, content } = this.props;
        const escapedContent = content.replace(/\s/gi, "");
        if(escapedContent.length === 0) {
            e.preventDefault();
            return;
        }

        TDLBoardActions.confirmNewCard({id: this.getEscapedId(id), content});
        ButtonActions.changeContent({content: ''});
    }

    handleChangeContent = (e) => {
        const { ButtonActions } = this.props;
        ButtonActions.changeContent({content: e.target.value});
    }

    render() {
        const {
            title,
            id,
            cards,
            formOpen,
            index: listIndex,
        } = this.props;

        const {
            handleChangeContent,
            handleOpenNewCard,
            handleConfirmNewCard,
            handleCloseNewCard,
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
            <Draggable draggableId={String(id)} index={listIndex}>
                {provided => (
                    <BoardDiv 
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                        <Droppable droppableId={String(id)}>
                            {provided => (
                                <div {...provided.droppableProps} 
                                ref={provided.innerRef}
                                >
                                    <CardDiv>
                                        <HeaderDiv>{title}</HeaderDiv>
                                        {jsxList}
                                    </CardDiv>
                                    {provided.placeholder}
                                    {formOpen
                                    ? <NewForm 
                                    text="Add Card"
                                    placeHolder="Enter a title for this card..."
                                    handleClose={handleCloseNewCard}
                                    handleChange={handleChangeContent}
                                    handleAdd={handleConfirmNewCard}
                                    id={id}
                                    />
                                    : <NewActionButton 
                                    color={"rgba(0, 0, 0, .54)"}
                                    backgroundColor={"transparent"}
                                    text={"Add another card"} 
                                    handleClick={handleOpenNewCard}
                                    id={id}
                                    />
                                    }
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
        lists: state.lists.get('list'),
        content: state.actionButton.get('content'),
        boardFormOpen: state.actionButton.get('boardFormOpen'),
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
        ButtonActions: bindActionCreators(buttonActions, dispatch)
    })
)(TrelloBoardContainer);

