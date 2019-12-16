import React from 'react';
import {Route} from 'react-router-dom';
import ListContainer from './containers/ListContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {Home, Auth, Boards} from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';
import storage from 'lib/api/storage';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';

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

  initializeUserInfo = async () => {
    const signedInInfo = storage.get('signedInInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!signedInInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

    const { UserActions, history } = this.props;
    UserActions.setSignedInInfo(signedInInfo);

    try {
        await UserActions.checkStatus();

        // 바로 boards로 넘겨준다
        history.push('/boards');
    } catch (e) {
        storage.remove('signedInInfo');
        window.location.href = '/auth/login?expired';
    }
  }

  componentDidMount() {
    this.initializeUserInfo();
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

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
