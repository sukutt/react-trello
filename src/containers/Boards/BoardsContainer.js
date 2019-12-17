import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SideNav, GridPanel } from 'components/Boards';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

const BoardsDiv = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const StyledDrawer = styled(Drawer)`
    width: 240px;
    flexShrink: 0;
    > div {
        position: relative;
        border: none;
    }
`
const Main = styled.main`
    flex-grow: 1;
    padding: 10px;
`;

const Spacer = styled.div`
    height: 30px;
`;

class BoardsContainer extends Component {
    componentDidMount() {
        //  boards 목록 획득
    }

    render() {
        return (
            <BoardsDiv>
                <StyledDrawer
                variant="permanent"
                >
                    <SideNav />
                </StyledDrawer>
                <Main>
                    <GridPanel isFavorite={true}>
                        Favorite
                    </GridPanel>
                    <Spacer />
                    <GridPanel isFavorite={false}>
                        Personal
                    </GridPanel>
                </Main>
            </BoardsDiv>
        )
    }
}

export default connect(
    (state) => ({
        boards: state.boards
    }),
    (dispatch) => {

    }
)(BoardsContainer);
