import React from 'react';
import {Route} from 'react-router-dom';
import {Home, Auth, Boards, TDLBoard} from 'pages';
import HeaderContainer from 'containers/Base/HeaderContainer';
import storage from 'lib/storage';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

class App extends React.Component {
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
      <Container>
        <RootDiv>
          <HeaderContainer />
          <Route exact path="/" component={Home}/>
          <Route path="/tdl" component={TDLBoard} />
          <Route path="/auth" component={Auth}/>
          <Route path="/boards" component={Boards} />
        </RootDiv>
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
