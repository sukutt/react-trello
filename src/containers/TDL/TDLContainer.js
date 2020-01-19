import React, { Component } from 'react';
import ListContainer from 'containers/TDL/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as boardActions from 'store/modules/boards';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';
import HeaderContainer from './HeaderContainer';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

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

const BoardMenuContentFrame = styled.div`
    transition-property: transform,opacity;
    transition-duration: .12s;
    transition-timing-function: ease-in;
    transform: translateX(0);
    flex: 1 auto;
    width: 100%;
`;

const BoardMenuNavigation = styled.ul`
    margin: 4px 0;
    list-style: none;
    padding: 0;
`;

const BoardMenuNavigationItem = styled.li`
    cursor: pointer;
`;

const BoardCloseCard = styled.div`
    background-color: rgb(19, 21, 22);
    box-shadow: rgba(3, 25, 63, 0.25) 0px 8px 16px -4px, rgba(3, 25, 63, 0.08) 0px 0px 0px 1px;
    border-radius: 3px;
    overflow: hidden;
    position: absolute;
    width: 304px;
    z-index: 70;
`;

const BoardCloseCardHeader = styled.div`
    height: 40px;
    position: relative;
    margin-bottom: 8px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BoardCloseCardHeaderTitle = styled.span`
    color: rgb(191, 186, 175);
    border-bottom: 1px solid rgba(22, 89, 204, 0.13);
    box-sizing: border-box;
    line-height: 40px;
    margin: 0 12px;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
    flex: 1;
`;

const CloseCardButton = styled(Icon)`
    cursor: pointer;
    color: rgb(176, 193, 210);
    padding: 10px 12px 10px 8px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    &:hover {
        color: white;
    }
`;

const BoardCloseCardBody = styled.div`
    max-height: 674px; 
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 12px 12px;
`;

const BoardCloseCardParagraph = styled.p`
    margin: 0 0 8px;
    color: rgb(213, 210, 203);
`

const BoardCloseCardButton = styled(Button)`
    &&& {
        background-color: rgb(134, 43, 28);
        color: white;
    }
    width: 100%;
`;

const BoardMenuNavigationItemLink = styled.a`
    text-decoration-color: initial;
    border-radius: 3px;
    display: block;
    font-weight: 600;
    line-height: 20px;
    text-decoration: none;
    padding: 6px 6px 6px 40px;
    position: relative;
    color: rgb(213, 210, 203);

    &:hover {
        color: white;
    }
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

const BoardMain = styled(({boardMenuOpen, ...rest}) => <div {...rest} />)`
    @media only screen and (max-width: 900px) and (min-width: 751px),
    only screen and (max-width: 1280px) and (min-width: 901px), only screen and (min-width: 1281px) {
        margin-right: ${props => props.boardMenuOpen ? '339px' : '0px'};
    }

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
    hideCloseCard: {
        display: 'none'
    },
    visible: {
        transform: 'translateX(0)',
        boxShadow: 'rgba(3, 25, 63, 0.25) 0px 12px 24px -6px, rgba(3, 25, 63, 0.08) 0px 0px 0px 1px'
    },
});

class TDLContainer extends Component {
    state = {
        boardMenuOpen: false,
        closeBoardOpen: false,
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

    handleCloseBoardCard = () => {
        this.setState((prevState) => ({ closeBoardOpen: !prevState.closeBoardOpen})) 
    }

    handleCloseBoard = async () => {
        // 보드 삭제
        const { BoardActions, boardId } = this.props;
        try {
            await BoardActions.deleteBoard({id: boardId});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const {
            title,
            boardId,
            isFavorite,
            classes,
        } = this.props;

        const {
            boardMenuOpen,
            closeBoardOpen
        } = this.state;

        const {
            handleBoardAction,
            handleCloseBoardMenu,
            handleCloseBoardCard,
            handleCloseBoard
        } = this;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Body>
                    <Board>
                        <BoardWrapper>
                            <BoardMain boardMenuOpen={boardMenuOpen}>
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
                                            <BoardMenuContentFrame>
                                                <BoardMenuNavigation>
                                                    <BoardMenuNavigationItem>
                                                        <BoardMenuNavigationItemLink onClick={handleCloseBoardCard}>
                                                            Close Board...
                                                        </BoardMenuNavigationItemLink>
                                                    </BoardMenuNavigationItem>
                                                    <BoardCloseCard className={closeBoardOpen ? '' : classes.hideCloseCard}>
                                                        <div>
                                                            <BoardCloseCardHeader>
                                                                <BoardCloseCardHeaderTitle>
                                                                    Close Board?
                                                                </BoardCloseCardHeaderTitle>
                                                                <CloseCardButton 
                                                                fontSize="small"
                                                                onClick={handleCloseBoardCard}
                                                                >
                                                                    close
                                                                </CloseCardButton>
                                                            </BoardCloseCardHeader>
                                                            <BoardCloseCardBody>
                                                                <div>
                                                                    <BoardCloseCardParagraph>
                                                                        Do you want to close this board?
                                                                    </BoardCloseCardParagraph>
                                                                    <BoardCloseCardButton
                                                                        onClick={handleCloseBoard}
                                                                    >
                                                                        Close
                                                                    </BoardCloseCardButton>
                                                                </div>
                                                            </BoardCloseCardBody>
                                                        </div>
                                                    </BoardCloseCard>
                                                </BoardMenuNavigation>
                                            </BoardMenuContentFrame>
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
        BoardActions: bindActionCreators(boardActions, dispatch),
    })
)(withStyles(useStyles)(TDLContainer));