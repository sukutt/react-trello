import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styleUtils';

const StyledButton = styled(({isSignUp, backgroundColor, ...rest}) => <Link {...rest} />)`
    font-weight: 600;
    color: white;
    border: ${props => props.isSignUp ? '1px solid white' : 'none'};
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;

    &:hover {
        background: ${props => props.backgroundColor};
        ${shadow(1)}
    }
    &:active {
        transform: translateY(-3px);
    }
`;

const LoginButton = ({text, backgroundColor, to}) => (
    <StyledButton isSignUp={text === 'Sign up' ? true : false} backgroundColor={backgroundColor} to={to}>
        {text}
    </StyledButton>
);

export default LoginButton;