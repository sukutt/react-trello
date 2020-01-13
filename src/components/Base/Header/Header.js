import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const StyledAppBar = styled(({signedIn, isTDLPage, ...rest}) => <AppBar {...rest} />)`
    height: ${props => props.signedIn ? '40px' : '48px'};
    &&& {
        background: ${props => props.isTDLPage 
            ? 'rgba(0, 0, 0, 0.15)'
            : props.signedIn ? 'linear-gradient(135deg, #0079bf, #5067c5)' : 'transparent'};
    }
`;

const StyledToolbar = styled(({signedIn, ...rest}) => <Toolbar {...rest} />)`
    &&& {
        min-height: ${props => props.signedIn ? '40px' : '48px'};
    }
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Header = ({signedIn, isTDLPage, children}) => {
    return (
        <StyledAppBar position="relative" isTDLPage={isTDLPage} signedIn={signedIn}>
            <StyledToolbar signedIn={signedIn} variant="dense">
                <Typography variant="h6">
                    Frello
                </Typography>
                <Spacer />
                {children}
            </StyledToolbar>
        </StyledAppBar>
    )
};

export default Header;