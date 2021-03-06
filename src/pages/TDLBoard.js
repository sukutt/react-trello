import React, { Component } from 'react';
import TDLContainer from 'containers/TDL/TDLContainer';
import * as baseActions from 'store/modules/base';
import * as tdlBoardActions from 'store/modules/lists';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';


class TDLBoard extends Component {
    componentDidMount() {
        const {
            BaseActions,
            location,
        } = this.props;

        const isFavorite = location.state && location.state.isFavorite;
        if (isFavorite === undefined) {
            return;
        }

        BaseActions.setHeaderTransparency(true);
        // board 로드 시 현재 배경화면 설정
        const { thumbnail } = location.state;
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
        // 상태 값 청소
        this.props.TDLBoardActions.clearState();
    }

    render() {
        const {
            title,
            boardId
        } = this.props.match.params;

        const isFavorite = this.props.location.state && this.props.location.state.isFavorite;

        return isFavorite !== undefined ? (
            <TDLContainer
            title={title}
            boardId={boardId}
            isFavorite={isFavorite}
            />
        ) : (
            <Redirect to='/' />
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch)
    })
)(TDLBoard);