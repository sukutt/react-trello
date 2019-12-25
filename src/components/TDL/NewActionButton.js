import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

const ActionButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 24px;
    padding: 8px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    min-width: 280px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.2); 
        p {
            text-decoration: underline;
        }
    }
`;

const NewActionButton = ({handleClick, text}) => {
    return (
        <ActionButton onClick={handleClick}>
            <Icon >add</Icon>
            <p>{text}</p>
        </ActionButton>
    )
}

export default NewActionButton;