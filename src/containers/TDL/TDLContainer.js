import React, { Component } from 'react';
import ListContainer from 'containers/TDL/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';
import HeaderContainer from './HeaderContainer';
import styled from 'styled-components';

const Body = styled.main`
    position: relative;
    overflow-y: auto;
    outline: none;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const Board = styled.div`
    flex-grow: 1;
    position: relative;
    outline: none;
`;

const BoardWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

const BoardMain = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 0;
    transition: margin .1s ease-in;
`;

const BoardList = styled.div`
    padding: 10px;
    background: linear-gradient(180deg,rgba(0,0,0,.24) 0,rgba(0,0,0,.24) 48px,transparent 80px,transparent);
    position: relative;
    flex-grow: 1;
`;

class TDLContainer extends Component {
    onDragEnd = (result) => {
        const { TDLBoardActions } = this.props;
        const {destination, source, type} = result;

        if (!destination) {
          return;
        }

        TDLBoardActions.reorder({
          droppableIdStart: source.droppableId,
          droppableIdEnd: destination.droppableId,
          droppableIndexStart: source.index,
          droppableIndexEnd: destination.index,
          type,
        })
    }

    initLists = async () => {
        const { TDLBoardActions, boardId } = this.props;
        try {
            await TDLBoardActions.getLists(boardId);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.initLists();
    }

    render() {
        const {
            title,
            boardId,
        } = this.props;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Body>
                    <Board>
                        <BoardWrapper>
                            <BoardMain>
                                <HeaderContainer title={title} boardId={boardId} />
                                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                                    {provided => (
                                    <BoardList {...provided.droppableProps} ref={provided.innerRef} >
                                        <ListContainer boardId={boardId} provided={provided}/>
                                    </BoardList>
                                    )}
                                </Droppable>
                            </BoardMain>
                        </BoardWrapper>
                    </Board>
                </Body>
            </DragDropContext>
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
    })
)(TDLContainer);