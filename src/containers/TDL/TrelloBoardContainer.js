import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tdlBoardActions from 'store/modules/lists';
import styled from 'styled-components';
import TrelloCardContainer from 'containers/TDL/TrelloCardContainer';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { CreateCardButton } from 'components/TDL';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Textarea from 'react-textarea-autosize';

const HeaderWrapper = styled.div`
    flex: 0 0 auto;
    padding: 10px 36px 2px 14px;
    position: relative;
    min-height: 20px;
`;

const HeaderTitle = styled.div`
    margin: 0 0 8px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #172b4d;
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

const TitleContent = styled.div`
    overflow: hidden;
    padding: 6px 8px 2px;
    position: relative;
    z-index: 10;
`;

const TitleTextArea = styled(({height, ...rest}) => <Textarea {...rest} />)`
    resize: none;
    width: 100%;
    overflow-y: ${props => props.height > 162 ? 'scroll' : 'hidden'};
    overflow-wrap: break-word;
    background: none;
    outline: none;
    border: none;
    height: 54px;
    box-shadow: none;
    margin-bottom: 4px;
    max-height: 162px;
    min-height: 54px;
    padding: 0;
    display: block;
    line-height: 20px;
    border-radius: 3px;
    box-sizing: border-box;
`;

const MoreMenuWrapper = styled.div`
    position: absolute;
    right: 6px;
    top: 4px;
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

class TrelloBoardContainer extends Component {
    constructor(props) {
        super(props);
        this.textAreaRef = React.createRef();
    }

    state = {
        isEditable: false,
        // title: '',
    }

    handleConfirmNewCard = (content) => {
        const { TDLBoardActions, id, boardId } = this.props;
        TDLBoardActions.confirmNewCard({
            boardId,
            listId: id,
            content
        });
    }

    handleClick = () => {
        this.setState({
            isEditable: true,
        })
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
            handleClick
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
                                    <HeaderWrapper>
                                        <HeaderTitle>{title}</HeaderTitle>
                                        <MoreMenuWrapper>
                                            <HorizIcon 
                                            fontSize="small"
                                            onClick={handleClick}
                                            />
                                        </MoreMenuWrapper>
                                    </HeaderWrapper>
                                    <CardDiv>
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
        boardId: state.lists.get('boardId'),
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
    })
)(TrelloBoardContainer);

