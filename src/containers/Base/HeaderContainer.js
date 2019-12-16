import React, {Component} from 'react';
import Header, {LoginButton} from 'components/Base/Header';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Spacer = styled.div`
    width: 5px;
`;

class HeaderContainer extends Component {
    render() {
        const { visible } = this.props;
        if(!visible) return null;

        return (
            <Header signedIn>
                <LoginButton to="/auth/register" text="Sign up"  backgroundColor="#3f51b5" />
                <Spacer />
                <LoginButton to="/auth/login" text="Sign in" backgroundColor="transparent" />
            </Header>
        )
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
    }),
    (dispatch) => ({
    })
)(HeaderContainer);
