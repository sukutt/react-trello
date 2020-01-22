import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const StyledAppBar = styled(({signedIn, isTDLPage, ...rest}) => <AppBar {...rest} />)`
    height: ${props => props.signedIn ? '40px' : '48px'};
    &&& {
        background: ${props => props.isTDLPage 
            ? 'rgba(0, 0, 0, 0.15)'
            : props.signedIn ? 'linear-gradient(135deg, #0079bf, #5067c5)' : 'transparent'};
    }
`;

const StyledToolbar = styled(({signedIn, ...rest}) => <Toolbar {...rest} />)`
    padding: 0 4px;
    &&& {
        min-height: ${props => props.signedIn ? '40px' : '48px'};
    }
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const HomeButton = styled(IconButton)`
    &&& {
        margin-right: 4px;
        border-radius: 3px;
        background-color: hsla(0, 0%, 100%, .3);
    }

    &:hover {
        opacity: .9;
    }
`;

const HomeIcon = styled(HomeOutlinedIcon)`
    color: white;
`;

const FrelloHome = styled(Typography)`
    display: block;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    cursor: pointer;
    &&& {
        color: hsla(0, 0%, 100%, .8);
        &:hover {
            color: hsla(0, 0%, 100%, 1);
        }
    }
`;

const Header = ({signedIn, isTDLPage, children}) => {
    return (
        <StyledAppBar position="relative" isTDLPage={isTDLPage} signedIn={signedIn}>
            <StyledToolbar disableGutters={true} signedIn={signedIn} variant="dense">
                <HomeButton size="small" aria-label="home">
                    <HomeIcon />
                </HomeButton>
                <FrelloHome variant="h6">
                        Frello
                </FrelloHome>
                <Spacer />
                {children}
            </StyledToolbar>
        </StyledAppBar>
    )
};

export default Header;