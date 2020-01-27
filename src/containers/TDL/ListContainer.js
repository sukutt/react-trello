import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import styled from 'styled-components';
import TrelloBoardContainer from 'containers/TDL/TrelloBoardContainer';
import { CreateListButton } from 'components/TDL';
import { bindActionCreators } from 'redux';

const Body = styled.div`
    display: inline-flex;
    align-items: flex-start;
    height: 100%;
    user-select: none;
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
                key={item.get('_id')}
                title={item.get('title')}
                id={item.get('_id')}
                cards={item.get('cards')}
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