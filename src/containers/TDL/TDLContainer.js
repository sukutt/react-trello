import React, { Component } from 'react';
import ListContainer from 'containers/TDL/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';
import HeaderContainer from './HeaderContainer';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const RightSlideMenu = styled.div`
    bottom: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition-property: transform,width;
    transition-duration: .1s;
    transition-timing-function: ease-in;
    transform: translateX(339px);
    width: 339px;
    z-index: 5;
`;

const BoardMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    left: 0;
    bottom: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

const BoardMenuTabContent = styled.div`
    background-color: rgb(22, 24, 25);
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow: hidden;
`;

const BoardMenuHeader = styled.div`
    opacity: 1;
    overflow: visible;
    transition: auto;
    box-sizing: border-box;
    flex: 0 0 auto;
    height: 48px;
    padding: 0 6px 0 12px;
    position: relative;
    width: 100%;
`;
const BoardHeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const HeaderTitle = styled.h3`
    line-height: 20px;
    margin: 14px 32px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    transition: margin .12s ease-in;
    white-space: nowrap;
    flex: 1;
    color: rgb(213, 210, 203);
    font-size: 16px;
    font-weight: 600;
`

const CloseButton = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
    color: rgb(176, 193, 210);

    &:hover {
        color: white;
    }
`;

const HorizontalDivider = styled.hr`
    margin: 0;
    border: 0;
    height: 1px;
    padding: 0;
    width: 100%;
`;

const BoardMenuContent = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 12px 6px 12px 12px;
    width: 100%;
    height: 100%;
`;

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
    position: relative;
    flex-grow: 1;
    overflow: auto;
`;

const useStyles = theme => ({
    visible: {
        transform: 'translateX(0)',
        boxShadow: 'rgba(3, 25, 63, 0.25) 0px 12px 24px -6px, rgba(3, 25, 63, 0.08) 0px 0px 0px 1px'
    },
});

class TDLContainer extends Component {
    state = {
        boardMenuOpen: false,
    }

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

    handleBoardAction = () => {
        this.setState((prevState) => ({ boardMenuOpen: !prevState.boardMenuOpen}))
    }

    handleCloseBoardMenu = () => {
        this.setState((prevState) => ({ boardMenuOpen: !prevState.boardMenuOpen}))
    }

    render() {
        const {
            title,
            boardId,
            isFavorite,
            classes,
        } = this.props;

        const {
            boardMenuOpen
        } = this.state;

        const {
            handleBoardAction,
            handleCloseBoardMenu
        } = this;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Body>
                    <Board>
                        <BoardWrapper>
                            <BoardMain>
                                <HeaderContainer 
                                    title={title} 
                                    boardId={boardId} 
                                    isFavorite={isFavorite} 
                                    handleBoardAction={handleBoardAction}
                                    boardMenuOpen={boardMenuOpen}
                                />
                                <Droppable droppableId={boardId} direction="horizontal" type="list">
                                    {provided => (
                                    <BoardList {...provided.droppableProps} ref={provided.innerRef} >
                                        <ListContainer boardId={boardId} provided={provided} />
                                    </BoardList>
                                    )}
                                </Droppable>
                            </BoardMain>
                            <RightSlideMenu className={boardMenuOpen ? classes.visible : ''}>
                                <BoardMenuContainer>
                                    <BoardMenuTabContent>
                                        <BoardMenuHeader>
                                            <BoardHeaderContent>
                                                <HeaderTitle>
                                                    Menu
                                                </HeaderTitle>
                                                <CloseButton onClick={handleCloseBoardMenu}>
                                                    close
                                                </CloseButton>
                                            </BoardHeaderContent>
                                            <HorizontalDivider />
                                        </BoardMenuHeader>
                                        <BoardMenuContent>

                                        </BoardMenuContent>
                                    </BoardMenuTabContent>
                                </BoardMenuContainer>
                            </RightSlideMenu>
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
)(withStyles(useStyles)(TDLContainer));