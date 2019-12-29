import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Main = styled.div`
    height: auto;
    background-color: rgba(0,0,0,.24);
    padding: 8px 4px 4px 8px;
    position: relative;
`;

const CenteredTypography = styled(Typography)`
    padding: 0 12px;
    color: white;
`;

class HeaderContainer extends Component {
    render() {
        const {
            title
        } = this.props;

        return (
            <Main>
                <CenteredTypography variant='h6'>
                    {title}
                </CenteredTypography>
            </Main>
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch)
    })
)(HeaderContainer);