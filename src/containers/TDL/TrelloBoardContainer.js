import React, { Component } from 'react'; import { connect } from 'react-redux'; import { bindActionCreators } from 'redux';
import * as tdlBoardActions from 'store/modules/lists';
import styled from 'styled-components';
import TrelloCardContainer from 'containers/TDL/TrelloCardContainer';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { CreateCardButton } from 'components/TDL';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Textarea from 'react-textarea-autosize';
import { isEmptyOrSpaces } from 'lib/fnUtils';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CommonCard from 'components/Base/CommonCard';

const HeaderWrapper = styled.div`
    flex: 0 0 auto;
    padding: 6px 32px 0px 10px;
    position: relative;
    min-height: 20px;
    cursor: pointer;
`;

const CardDiv = styled.div`
    margin-bottom: 0;
    flex: 1 1 auto;
    min-height: 0;
    // overflow-y: auto;
    // overflow-x: hidden;
    margin: 0 4px;
    padding: 0 4px;
`;

const BoardDiv = styled.div`
    width: 272px;
    margin-right: 8px;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    &:first-child {
        margin-left: 8px;
    }
`;

const BoardContent = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
`;

const TitleContent = styled.div`
    overflow: hidden;
    position: relative;
    z-index: 10;
`;

const TitleTextArea = styled(({isEditable, childRef, ...rest}) => <Textarea ref={childRef} {...rest} />)`
    border: none;
    resize: none;
    width: 100%;
    border-radius: 3px;
    color: #172b4d;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    overflow-wrap: break-word;
    background: transparent;
    padding: 4px;
    margin: 0 0 8px;
    box-shadow: none;
    max-height: 256px;
    display: block;
    line-height: 24px;
    box-sizing: border-box;
    transition-property: background-color,border-color,box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    cursor: ${props => props.isEditable ? 'text' : 'pointer'};

    &:focus {
        background: white;
        border: none;
        box-shadow: inset 0 0 0 2px #0079bf;
        outline: 0;
    }
`;

const MoreMenuWrapper = styled.div`
    position: absolute;
    right: 6px;
    top: 6px;
    z-index: 1;
    border-radius: 3px;

    &:hover {
        background-color: rgba(120, 120, 120, .1);
    }
`;

const HorizIcon = styled(MoreHorizIcon)`
    color: #6b778c;
    float: left;
    padding: 6px;
`;

const BoardEditPopper = styled(Popper)`
    background: white;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    width: 304px;
    z-index: 1;
    overflow: hidden;
`;

class TrelloBoardContainer extends Component {
    constructor(props) {
        super(props);
        this.textAreaRef = React.createRef();
    }

    state = {
        isCardEditing: false,
        isEditable: false,
        title: '',
        originalTitle: '',
        anchorEl: null,
    }

    componentDidMount() {
        const {
            title
        } = this.props;

        this.setState({
            title,
            originalTitle: title,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.isEditable && this.state.isEditable) {
            this.textAreaRef.current._ref.select();
        }
    }

    handleConfirmNewCard = (content) => {
        const { TDLBoardActions, id, boardId } = this.props;
        TDLBoardActions.confirmNewCard({
            boardId,
            listId: id,
            content
        });
    }

    handleShowListMenu = (e) => {
        e.stopPropagation();

        const { currentTarget } = e;
        this.setState(prevState => ({
            anchorEl: prevState.anchorEl ? null : currentTarget,
        }));
    }

    handleClickAway = () => {
        this.setState({
            anchorEl: null
        })
    }

    handleBlur = async (e) => {
        e.target.blur();
        const title = e.target.value;

        if(isEmptyOrSpaces(title) || title === this.state.originalTitle) {
            this.setState({
                title: this.state.originalTitle,
                isEditable: false,
            })

            return;
        }

        const { TDLBoardActions } = this.props;

        // 타이틀 변경
        try {
            await TDLBoardActions.updateList({
                id: this.props.id,
                title,
            })
        } catch (e) {
            console.log(e);
        }

        this.setState({
            originalTitle: title,
            isEditable: false,
        })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if(isEmptyOrSpaces(e.target.value)) {
                return;
            }

            this.handleBlur(e);
        }
    }

    handleTitleChangeTrigger = (e) => {
        this.setState({
            isEditable: true,
        })
    }

    handleCardEditing = (e) => {
        this.setState(prevState => ({isCardEditing: !prevState.isCardEditing}));
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }

    handleDeleteList = async () => {
        const { TDLBoardActions, id } = this.props;
        try {
            await TDLBoardActions.deleteList({
                id,
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteAllCards = () => {
        const { TDLBoardActions, id } = this.props;

        TDLBoardActions.deleteCards({
            key: 'list',
            id,
            listId: id,
        })
    }

    render() {
        const {
            id, // listId
            cards,
            index: listIndex,
        } = this.props;

        const {
            isEditable,
            title,
            isCardEditing,
            anchorEl
        } = this.state;

        const {
            handleConfirmNewCard,
            handleShowListMenu,
            handleTitleChangeTrigger,
            handleTitleChange,
            handleBlur,
            handleKeyDown,
            handleCardEditing,
            handleClickAway,
            handleDeleteList,
            handleDeleteAllCards
        } = this;

        const jsxList = cards.map((item, index) => {
            return (
                <TrelloCardContainer
                content={item.get('content')}
                listIndex={listIndex}
                key={item.get('_id')}
                id={item.get('_id')}
                listId={id}
                index={index}
                />
            )
        });

        const listActions = [
            [{
                caption:'Add Card...',
                fn: null
            }, {
                caption: 'Copy List...',
                fn: null
            }, {
                caption: 'Move List...',
                fn: null
            }],
            [{
                caption: 'Sort By...',
                fn: null
            }],
            [{
                caption: 'Delete All Cards in This List...',
                fn: handleDeleteAllCards,
            }],
            [{
                caption: 'Delete This List',
                fn: handleDeleteList,
            }]
        ];

        const open = Boolean(anchorEl);

        return (
            // disableInteractiveElementBlocking는 수정 중일 때는 false로 잠궈둔다.
            <Draggable disableInteractiveElementBlocking={isEditable || isCardEditing ? false : true}  draggableId={id} index={listIndex}>
                {provided => (
                    <BoardDiv
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                        <Droppable droppableId={id}>
                            {provided => (
                                <BoardContent {...provided.droppableProps}
                                ref={provided.innerRef}
                                >
                                    <HeaderWrapper onClick={handleTitleChangeTrigger}>
                                        <TitleContent>
                                            <TitleTextArea 
                                                isEditable={isEditable}
                                                dir="auto"
                                                maxLength="512"
                                                spellCheck="false"
                                                onKeyDown={handleKeyDown}
                                                onChange={handleTitleChange}
                                                onBlur={handleBlur}
                                                value={title}
                                                childRef={this.textAreaRef}
                                                onHeightChange={(height, textarea) => {
                                                    textarea._ref.style.overflowY = height > 256 ? 'scroll' : 'hidden';
                                                }}
                                                />
                                        </TitleContent>
                                        <ClickAwayListener onClickAway={handleClickAway}>
                                            <div>
                                                <MoreMenuWrapper>
                                                    <HorizIcon 
                                                        fontSize="small"
                                                        onClick={handleShowListMenu}
                                                    />
                                                </MoreMenuWrapper>
                                                <BoardEditPopper
                                                id="board-edit-popper"
                                                placement="bottom-start"
                                                open={open} 
                                                anchorEl={anchorEl}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                >
                                                    <CommonCard actionList={listActions} />
                                                </BoardEditPopper>
                                            </div>
                                        </ClickAwayListener>
                                    </HeaderWrapper>
                                    <CardDiv>
                                        {jsxList}
                                    </CardDiv>
                                    {provided.placeholder}
                                    <CreateCardButton handleEditing={handleCardEditing} createNewCard={handleConfirmNewCard} />
                                </BoardContent>
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
        boardId: state.lists.get('boardId'),
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
    })
)(TrelloBoardContainer);

