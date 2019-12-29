import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const StyledAppBar = styled(({signedIn, ...rest}) => <AppBar {...rest} />)`
    background: ${props => props.signedIn ? 'linear-gradient(135deg, #0079bf, #5067c5)' : 'transparent'} !important;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Header = ({signedIn, children}) => {
    return (
        <StyledAppBar position="fixed" signedIn={signedIn}>
            <Toolbar variant="dense">
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