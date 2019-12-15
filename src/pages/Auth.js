import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { AuthWrapper } from 'components/Auth';
import {Register, Login} from 'containers/Auth';
import { Route } from 'react-router-dom';

class Auth extends Component {
    // 인증 페이지 진입 시 헤더 숨김
    componentDidMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }

    // 인증 페이지 벗어나면 헤더 다시 표시
    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        return (
            <AuthWrapper>
                <Route path="/auth/login" component={Login}/>
                <Route path="/auth/register" component={Register}/>
            </AuthWrapper>
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Auth);