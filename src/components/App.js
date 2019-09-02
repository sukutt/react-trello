import React from 'react';
import ListContainer from '../containers/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class App extends React.Component {
  onDragEnd = (result) => {
    const { onReorder } = this.props;
    const {destination, source, draggableId, type} = result;
    
    if (!destination) {
      return;
    }

    onReorder({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
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
                  <ListContainer />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
    )
  }
}

export default App;
