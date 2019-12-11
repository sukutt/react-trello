import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const StyledAppBar = styled(AppBar)`
    position: fixed !important;
    background-color: transparent !important;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Header = ({children}) => {
    return (
        <StyledAppBar>
        <Toolbar>
            <Typography variant="h6">
                Frello
            </Typography>
            <Spacer />
            {children}
        </Toolbar>
    </StyledAppBar>
    )
};

export default Header;