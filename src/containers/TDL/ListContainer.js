import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import * as buttonActions from 'store/modules/actionButton';
import styled from 'styled-components';
import TrelloBoardContainer from 'containers/TDL/TrelloBoardContainer';
import { NewForm, NewActionButton } from 'components/TDL';
import { bindActionCreators } from 'redux';

const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

class ListContainer extends Component {
    handleOpenNewBoard = () => {
        const { ButtonActions } = this.props;
        ButtonActions.addBoard({isOpen: true});
    }

    handleConfirmNewBoard = (e) => {
        const { TDLBoardActions, ButtonActions, content } = this.props;
        const escapedContent = content.replace(/\s/gi, "");
        if(escapedContent.length === 0) {
            e.preventDefault();
            return;
        }

        TDLBoardActions.confirmNewBoard({title: content});
        ButtonActions.changeContent({content: ''});
    }

    handleCloseNewBoard = () => {
        const { ButtonActions } = this.props;
        ButtonActions.addBoard({isOpen: false});
        ButtonActions.changeContent({content:''});
    }

    handleChangeContent = (e) => {
        const { ButtonActions } = this.props;
        ButtonActions.changeContent({content: e.target.value});
    }

    render() {
        const {
            list,
            provided,
            boardFormOpen,
        } = this.props;

        const {
            handleChangeContent,
            handleOpenNewBoard,
            handleConfirmNewBoard,
            handleCloseNewBoard,
        } = this;

        const jsxList = list.map((item, index) => {
            return (
                <TrelloBoardContainer
                item={item}
                key={item.get('id')}
                title={item.get('title')}
                id={item.get('id')}
                cards={item.get('cards')}
                formOpen={item.get('formOpen')}
                index={index}
                />
            )
        })

        return (
            <Body>
                {jsxList}
                {provided.placeholder}
                {boardFormOpen
                ? <NewForm 
                text="Add List"
                placeHolder="Enter list title..."
                handleClose={handleCloseNewBoard}
                handleChange={handleChangeContent}
                handleAdd={handleConfirmNewBoard}
                />
                : <NewActionButton 
                text={"Add another list"} 
                handleClick={handleOpenNewBoard}
                />
                }
            </Body>
        )
    }
}

export default connect(
    (state) => ({
        list: state.lists.get('list'),
        content: state.actionButton.get('content'),
        boardFormOpen: state.actionButton.get('boardFormOpen'),
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
        ButtonActions: bindActionCreators(buttonActions, dispatch)
    })
)(ListContainer);