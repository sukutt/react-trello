import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
    background-color: white !important;
    color: #3f51b5 !important;
    margin-left: 5px !important;
`;

const LoginButton = () => (
    <StyledButton to="/auth/login">
        Sign in
    </StyledButton>
);

export default LoginButton;