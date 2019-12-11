import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

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
            <div>
                Auth
            </div>
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