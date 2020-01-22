import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { Link } from 'react-router-dom';

const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
    40% {transform: translateX(-50%) translateY(-10px);}
    60% {transform: translateX(-50%) translateY(-5px);}
`

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

const FrelloHome = styled(({bounce, ...rest}) => <Link {...rest} />)`
    ${(props) => props.bounce && css`
        animation: ${bounce} 1s;
    `}
    display: block;
    cursor: pointer;
    &&& {
        color: hsla(0, 0%, 100%, .8);
        &:hover {
            color: hsla(0, 0%, 100%, 1);
        }
    }
    text-decoration: none;
    font-size: 1.8rem;
`;

const FrelloBoard = styled(({bounce, ...rest}) => <Link {...rest} />)`
    ${(props) => props.bounce && css`
        animation: ${bounce} 1s;
    `}
    font-size: 1.4rem;
    text-decoration: none;
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

export default function Header({signedIn, isTDLPage, handleGoBackToBoards, children}) {
    const [bounce, setBounce] = React.useState(null);

    return (
        <StyledAppBar position="relative" isTDLPage={isTDLPage} signedIn={signedIn}>
            <StyledToolbar disableGutters={true} signedIn={signedIn} variant="dense">
                {signedIn ? (
                <HomeButton onClick={handleGoBackToBoards} size="small" aria-label="home">
                    <HomeIcon />
                </HomeButton>
                ) : ''}
                {signedIn ? (
                <FrelloBoard 
                onClick={() => setBounce(true)}
                onAnimationEnd={() => setBounce(false)}
                bounce={bounce}
                to="/boards"
                >
                    Frello
                </FrelloBoard>
                ) : (
                <FrelloHome 
                onClick={() => setBounce(true)}
                onAnimationEnd={() => setBounce(false)}
                bounce={bounce}
                to="/">
                    Frello
                </FrelloHome>
                )}
                <Spacer />
                {children}
            </StyledToolbar>
        </StyledAppBar>
    )
};