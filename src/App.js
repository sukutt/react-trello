import React from 'react';
import {Route} from 'react-router-dom';
import ListContainer from './containers/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {Home, Auth, Boards} from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';

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
      <div>
        <HeaderContainer />
        <Route exact path="/" component={Home}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/boards" component={Boards} />
      </div>
      
      // <DragDropContext onDragEnd={this.onDragEnd}>
      //   <div>
      //   <h2>Hello Trello</h2>
      //     <Droppable droppableId="all-lists" direction="horizontal" type="list">
      //       {provided => (
      //         <div {...provided.droppableProps} ref={provided.innerRef} >
      //           <ListContainer provided={provided}/>
      //         </div>
      //       )}
      //     </Droppable>
      //   </div>
      // </DragDropContext>
    )
  }
}

export default App;
