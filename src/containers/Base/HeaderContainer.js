import React, { Component } from 'react';
import Header, { LoginButton, UserButton } from 'components/Base/Header';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage'

const Spacer = styled.div`
    width: 5px;
`;

class HeaderContainer extends Component {
    handleLogout = async () => {
        const { UserActions } = this.props;

        try {
            await UserActions.logout();
        } catch (e) {
            console.log(e);
        }
        
        storage.remove('signedInInfo');
        window.location.href = '/';
    }


    render() {
        const { handleLogout } = this;
        const { visible, signedIn } = this.props;
        if(!visible) return null;

        return (
            <Header signedIn={signedIn}>
                { signedIn ? (
                    <UserButton handleLogout={handleLogout} />
                    ) : (
                    <React.Fragment>
                        <LoginButton to="/auth/register" text="Sign up"  backgroundColor="#3f51b5" />
                        <Spacer />
                        <LoginButton to="/auth/login" text="Sign in" backgroundColor="transparent" />
                    </React.Fragment>
                )}
            </Header>
        )
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        signedIn: state.user.get('signedIn')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(HeaderContainer);
