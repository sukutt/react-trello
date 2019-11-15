import React from 'react';
import ListContainer from '../containers/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// import Home from '../components/Home';

class App extends React.Component {
  onDragEnd = (result) => {
    const { onReorder } = this.props;
    const {destination, source, type} = result;

    if (!destination) {
      return;
    }

    onReorder({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      type,
    })
  }

  render() {
    return (
      // 기본적으로 Home화면이 필요하고
      // 로그인 세션 유무 확인해서 Home 보여줄지 바로 Trello 메인화면 보여줄지 선택 해야한다.
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

export default App;
