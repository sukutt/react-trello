import React, { Component } from 'react';
import { SideNav } from 'components/Boards';
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
    position: relative;
    border: none;
`

class BoardsContainer extends Component {
    render() {
        return (
            <BoardsDiv>
                <StyledDrawer
                    variant="permanent"
                >
                    <SideNav />
                </StyledDrawer>
                <main>
                    <div>
                        Main
                    </div>
                </main>
            </BoardsDiv>
        )
    }
}

export default BoardsContainer;
