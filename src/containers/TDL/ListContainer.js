import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import styled from 'styled-components';
import TrelloBoardContainer from 'containers/TDL/TrelloBoardContainer';
import { CreateListButton } from 'components/TDL';
import { bindActionCreators } from 'redux';

const Body = styled.div`
    user-select: none;
    white-space: nowrap;
    margin-bottom: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 8px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

class ListContainer extends Component {
    handleConfirmNewList = (title) => {
        const { TDLBoardActions, boardId } = this.props;

        TDLBoardActions.confirmNewList({
            boardId,
            title,
        });
    }

    render() {
        const {
            list,
            provided,
        } = this.props;

        const {
            handleConfirmNewList,
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
                <CreateListButton createNewList={handleConfirmNewList} />
            </Body>
        )
    }
}

export default connect(
    (state) => ({
        boardId: state.lists.get('boardId'),
        list: state.lists.get('list'),
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
    })
)(ListContainer);