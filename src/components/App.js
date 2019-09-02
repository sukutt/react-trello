import React from 'react';
import ListContainer from '../containers/ListContainer';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  onDragEnd = (result) => {
    const { onReorder } = this.props;
    const {destination, source, draggableId} = result;
    
    if (!destination) {
      return;
    }

    onReorder({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
    })
  }

  render() {
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <ListContainer />
        </DragDropContext>
    )
  }
}

export default App;
