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
  checkAuthentication = async () => {
    const { UserActions, history } = this.props;
    const signedInInfo = storage.get('signedInInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!signedInInfo) {
      history.push('/');
      return;
    };

    UserActions.setSignedInInfo(signedInInfo);

    try {
        await UserActions.checkStatus();
        if (this.props.isSignedIn && window.location.pathname === '/') {
          const { userId } = signedInInfo;
          history.push(`/${userId}/boards`);
        }
    } catch (e) {
        storage.remove('signedInInfo');
        history.push('/auth/login');
    }
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  render() {
    return (
      <Container>
        <Route component={HeaderContainer} />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/b/:boardId/:title" component={TDLBoard} />
          <Route path="/:userId/boards" component={Boards} />
          <Redirect to="/" />
        </Switch>
    </Container>
    )
  }
}

export default connect(
  (state) => ({
    signedInInfo: state.user.get('signedInInfo'),
    isSignedIn: state.user.get('signedIn'),
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
