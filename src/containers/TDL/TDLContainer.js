import React, { Component } from 'react';
import ListContainer from 'containers/TDL/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';
import HeaderContainer from './HeaderContainer';
import styled from 'styled-components';

const Body = styled.div`
    position: fixed;
    padding-top: 48px;
    width: 100%;
`;

const BoardList = styled.div`
    padding: 10px;
    background: linear-gradient(180deg,rgba(0,0,0,.24) 0,rgba(0,0,0,.24) 48px,transparent 80px,transparent);
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

    render() {
        const {
            title,
        } = this.props;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Body>
                    <HeaderContainer title={title} />
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {provided => (
                        <BoardList {...provided.droppableProps} ref={provided.innerRef} >
                            <ListContainer provided={provided}/>
                        </BoardList>
                        )}
                    </Droppable>
                </Body>
            </DragDropContext>
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch)
    })
)(TDLContainer);