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

    handleGoBackToBoards = () => {
        const { history } = this.props;
        history.push('/boards');
    }

    render() {
        const { 
            handleLogout,
            handleGoBackToBoards
        } = this;

        const { isTDLPage, visible, signedIn } = this.props;
        if(!visible) return null;

        return (
            <Header 
            signedIn={signedIn} 
            isTDLPage={isTDLPage}
            handleGoBackToBoards={handleGoBackToBoards}
            >
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
        isTDLPage: state.base.getIn(['header', 'isTDLPage']),
        visible: state.base.getIn(['header', 'visible']),
        signedIn: state.user.get('signedIn')
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(HeaderContainer);
