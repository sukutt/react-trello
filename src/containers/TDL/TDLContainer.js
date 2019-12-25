import React, { Component } from 'react';
import ListContainer from 'containers/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';

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
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    <h2>Hello Trello</h2>
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef} >
                            <ListContainer provided={provided}/>
                        </div>
                        )}
                    </Droppable>
                </div>
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