import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Textarea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

class TrelloActionButton extends Component {
    renderAddButton = (isBoard) => {
        const { 
            id,
            onAddCard,
            onAddBoard,
        } = this.props;

        const buttonText = isBoard ? "Add another card" :"Add another list";

        return (
            <ActionButton isBoard={isBoard} onClick={()=> {
                if(isBoard) {
                    onAddCard(id);
                } else {
                    onAddBoard();
                }
            }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </ActionButton>
        )
    }

    renderForm = (isBoard) => {
        const { 
            id,
            content,
            onReset,
            onCancelAddingBoard ,
            onCancelAddingCard,
            onConfirmNewCard,
            onChangeContent,
            onConfirmNewBoard
        } = this.props;

        const placeHolder = isBoard ? "Enter a title for this card..." : "Enter list title...";
        const buttonTitle = isBoard ? "Add Card" : "Add List";

        return (
            <Container>
                <StyledCard onMouseDown={(e) => {
                    e.preventDefault();
                }}>
                    <TextArea 
                        onChange={(e) => {
                            onChangeContent(e.target.value);
                        }}
                        placeholder={placeHolder}
                        autoFocus
                        onBlur={() => {
                            if(isBoard) {
                                onCancelAddingCard(id);
                            } else {
                                onCancelAddingBoard();
                            }
                            onReset();
                        }}
                    />
                </StyledCard>
                <AddCardButtonGroup>
                    <AddCardButton onMouseDown={(e) => {
                        const escapedContent = content.replace(/\s/gi, "");
                        if(escapedContent.length === 0) {
                            e.preventDefault();
                            return;
                        }
                        if(isBoard) {
                            onConfirmNewCard(id, content);
                        } else {
                            onConfirmNewBoard(content);
                        }
                        onReset();
                    }} variant="contained">{buttonTitle}{" "}</AddCardButton>
                    <CloseButton onClick={() => {
                        if(isBoard) {
                            onCancelAddingCard(id);
                        } else{
                            onCancelAddingBoard();
                        }
                        onReset();
                    }}>close</CloseButton>
                </AddCardButtonGroup>
            </Container>
        )
    }

    render() {
        const {
            formOpen,
            boardFormOpen,
            isBoard = true,
        } = this.props;

        return (
            formOpen || (isBoard === false && boardFormOpen) ?
            this.renderForm(isBoard)
            : this.renderAddButton(isBoard)
        )
    }
}

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

const ActionButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 24px;
    padding: 8px;
    color: ${props => props.isBoard ? "#5e6c84" : "white"};
    background-color: ${props => props.isBoard ? "transparent" : "rgba(0, 0, 0, 0.3)"};
    min-width: 280px;
    &:hover {
        background-color: ${props => props.isBoard ? "rgba(9,30,66,.13)" : "rgba(0, 0, 0, 0.2)"}; 
        p {
            text-decoration: underline;
        }
    }
`;

export default TrelloActionButton;