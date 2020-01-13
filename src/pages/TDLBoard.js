import React, { Component } from 'react';
import TDLContainer from 'containers/TDL/TDLContainer';
import * as baseActions from 'store/modules/base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TDLBoard extends Component {
    componentDidMount() {
        this.props.BaseActions.setHeaderTransparency(true);
        // board 로드 시 현재 배경화면 설정
        const { thumbnail } = this.props.location.state;
        const root = document.getElementById('root');

        // 기존 style 제거
        root.style.removeProperty('background-image');
        root.style.removeProperty('background-color');

        const backgroundKey = thumbnail.includes('image') ? 'background-image' : 'background-color';
        root.style[backgroundKey] = thumbnail;
    }

    // TDL 페이지 벗어날 시 원상복구
    componentWillUnmount() {
        this.props.BaseActions.setHeaderTransparency(false);
    }

    render() {
        const {
            title,
            boardId,
            isFavorite
        } = this.props.location.state;

        return (
            <TDLContainer 
            title={title}
            boardId={boardId}
            isFavorite={isFavorite}
            />
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(TDLBoard);