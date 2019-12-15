import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styleUtils';

const StyledButton = styled(Link)`
    font-weight: 600;
    color: white;
    border: 1px solid white;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;

    &:hover {
        background: #3f51b5;
        color: white;
        ${shadow(1)}
    }
    &:active {
        transform: translateY(-3px);
    }
`;

const LoginButton = () => (
    <StyledButton to="/auth/register">
        Sign in
    </StyledButton>
);

export default LoginButton;