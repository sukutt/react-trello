import React, { Component } from 'react';
import Header, { LoginButton, UserButton } from 'components/Base/Header';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as userActions from 'store/modules/user';
import { bindActionCreators } from 'redux';

const Spacer = styled.div`
    width: 5px;
`;

class HeaderContainer extends Component {
    render() {
        const { visible, signedIn, UserActions } = this.props;
        if(!visible) return null;

        return (
            <Header signedIn>
                { signedIn ? (
                    <UserButton UserActions />
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
