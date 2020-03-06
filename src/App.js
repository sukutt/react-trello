import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {Home, Auth, Boards, TDLBoard} from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';
import storage from 'lib/storage';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: inline-flex;
  min-width: 100%;
`;

class App extends React.Component {
  initializeUserInfo = async () => {
    const signedInInfo = storage.get('signedInInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!signedInInfo) return;

    const { UserActions, history } = this.props;
    UserActions.setSignedInInfo(signedInInfo);

    try {
        await UserActions.checkStatus();
        // 바로 boards로 넘겨준다
        history.push(`/${signedInInfo.userId}/boards`);
    } catch (e) {
        storage.remove('signedInInfo');
        window.location.href = '/auth/login?expired';
    }
  }

  componentDidMount() {
    const userInfo = storage.get('signedInInfo');
    const { history } = this.props;

    if (window.location.pathname !== '/' && userInfo === null) {
        history.push('/');
        return;
    }

    this.initializeUserInfo();
  }

  render() {
    return (
      <Container>
          <Route component={HeaderContainer} />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/b/:boardId/:title" component={TDLBoard} />
            <Route path="/auth" component={Auth}/>
            <Route path="/:userId/boards" component={Boards} />
            <Redirect to="/" />
          </Switch>
      </Container>
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
