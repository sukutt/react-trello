import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const Container = styled.div`
    padding: 0px 8px 2px;
`;

const StyledCard = styled(Card)`
    min-height: 85px;
    min-width: 272px;
    &:hover {
        cursor: text;
    }
`;

const TextArea = styled(Textarea)`
    resize: none;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
`;

const AddCardButton = styled(Button)`
    color: white !important;
    background-color: #5aac44 !important;
`;

const AddCardButtonGroup = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
`;

const CloseButton = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
`;

const NewForm = ({
    text,
    placeHolder,
    handleClose,
    handleChange,
    handleAdd,
    id
    }) => {
    return (
        <Container>
            <StyledCard onMouseDown={(e) => {
                e.preventDefault();
            }}>
                <TextArea 
                onChange={(e) => {
                    handleChange(e);
                }}
                placeholder={placeHolder}
                autoFocus
                onBlur={() => {
                    handleClose(id);
                }}
                />
            </StyledCard>
            <AddCardButtonGroup>
                <AddCardButton 
                onMouseDown={(e) => {
                    handleAdd(e, id);
                }}
                variant="contained">
                    {text}
                </AddCardButton>
                <CloseButton onClick={() => {
                    handleClose(id);
                }} >close</CloseButton>
            </AddCardButtonGroup>
        </Container>
    )
}

export default NewForm;