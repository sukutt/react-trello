import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

const ActionButton = styled(({color, backgroundColor, ...rest}) => <div {...rest} />)`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 24px;
    padding: 8px;
    color: ${props => {
        return props.color || 'white';
    }};
    background-color: ${props => {
        return props.backgroundColor || 'rgba(0, 0, 0, .3)';
    }};
    min-width: 280px;
    &:hover {
        opacity: 0.8;
        p {
            text-decoration: underline;
        }
    }
`;

const NewActionButton = ({color, backgroundColor, handleClick, text, id}) => {
    return (
        <ActionButton color={color} backgroundColor={backgroundColor} onClick={() => {
            handleClick(id);
        }}>
            <Icon >add</Icon>
            <p>{text}</p>
        </ActionButton>
    )
}

export default NewActionButton;