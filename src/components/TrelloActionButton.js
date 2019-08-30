import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

class TrelloActionButton extends Component {
    renderAddButton = (buttonText, onAddCard, id) => {
        return (
            <ActionButton onClick={()=> {
                onAddCard(id);
            }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </ActionButton>
        )
    }

    renderForm = () => {
        const { list } = this.props;
        const placeHolder = list ? "Enter list title..." : "Enter a title for this card...";
        const buttonTitle = list ? "Add List" : "Add Card";

        return (
            <Container>
                <StyledCard>
                    <TextArea 
                        placeholder={placeHolder} autoFocus 
                    />
                </StyledCard>
                <AddCardButtonGroup>
                    <AddCardButton variant="contained">{buttonTitle}{" "}</AddCardButton>
                    <CloseButton>close</CloseButton>
                </AddCardButtonGroup>
            </Container>
        )
    }

    render() {
        const { formOpen, list, onAddCard, id } = this.props;
        const buttonText = list ? "Add another list" : "Add another card";

        return (
            formOpen ? this.renderForm() : this.renderAddButton(buttonText, onAddCard, id)
        )
    }
}

const Container = styled.div`
    padding: 0px 8px 2px;
`;

const StyledCard = styled(Card)`
    min-height: 85px;
    min-width: 272px;
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

const ActionButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 24px;
    padding: 8px;
    color: ${props => props.list ? "white" : "inherit"};
    opacity: ${props => props.list ? 1 : 0.5};
    background-color: ${props => props.list ? "rgba(0,0,0,.15)" : "inherit"};
    &:hover {
        background-color: rgba(9,30,66,.13);
        p {
            text-decoration: underline;
        }
    }
`;


export default TrelloActionButton;