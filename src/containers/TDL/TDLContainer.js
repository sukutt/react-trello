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
    overflow: auto;
`;

class TDLContainer extends Component {
    onDragEnd = async (result) => {
        const { draggableId, destination, source, type } = result;

        if (!destination) {
            return;
        }

        const isSameList = source.droppableId === destination.droppableId;
        if((source.index === destination.index) && isSameList) {
            return;
        }

        const isDraggingList = type === 'list';
        const { list, TDLBoardActions } = this.props;

        let draggedItem = null;
        let ids = null;
        let newOrderedList = null;
        let sourceList = null;
        let destinationList = null;

        if(isDraggingList) {
            draggedItem = list.get(source.index); 
            newOrderedList = list.delete(source.index).insert(destination.index, draggedItem);
        } else {
            sourceList = list.find(item => item.get('_id') === source.droppableId);
            destinationList = list.find(item => item.get('_id') === destination.droppableId);

            const draggedItemIndex = sourceList.get('cards').findIndex(item => item.get('_id') === draggableId);
            draggedItem = sourceList.get('cards').get(draggedItemIndex);

            const cards = destinationList.get('cards');
            if (isSameList) {
                newOrderedList = cards.delete(source.index).insert(destination.index, draggedItem);
            } else {
                newOrderedList = cards.insert(destination.index, draggedItem);
            }
        }

        TDLBoardActions.reorderUI({
            type: isDraggingList ? 'list' : 'card',
            newOrderedList,
            source,
            destination,
            draggableId
        });

        if (newOrderedList) {
            // 위에서 만든 orderList를 서버로 전송, 저 리스트 순서대로 indexing을 업데이트 한다.
            ids = newOrderedList.map((item) => {
                return item.get('_id');
            });

            TDLBoardActions.reorder({
                id: destination.droppableId,
                key: isDraggingList ? 'list' : 'card',
                list: ids.toJS(),
            });
        }
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
                                <Droppable droppableId={boardId} direction="horizontal" type="list">
                                    {provided => (
                                    <BoardList {...provided.droppableProps} ref={provided.innerRef} >
                                        <ListContainer boardId={boardId} provided={provided} />
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
        list: state.lists.get('list'),
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
    })
)(TDLContainer);