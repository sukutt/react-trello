import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TrelloCard = ({content, id, index, onEditCard}) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <StyledCard>
                        <CardEditButton>
                            <EditIcon onClick={() => {
                                onEditCard();
                            }}>
                                edit
                            </EditIcon>
                        </CardEditButton>
                        <StyledCardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {content}
                            </Typography>
                        </StyledCardContent>
                    </StyledCard>
                </div>
            )}
        </Draggable>
    )
}

const EditIcon = styled(Icon)`
    font-size: 1.2rem !important;
`;

const CardEditButton = styled.span`
    position: absolute;
    font-size: 11px;
    right: 2px;
    top: 5px;
    padding: 4px;
    opacity: .8;
    background-color: #f4f5f7;
    visibility: hidden;
    border-radius: 3px;

    &:hover {
        background-color: #ebecf0;
        opacity: 1;
    }
`;

const StyledCard = styled(Card)`
    position: relative;
    max-width: 300px;
    min-height: 20px;
    display: block;
    margin-bottom: 8px;

    &:hover {
        background-color: #f4f5f7;
        ${CardEditButton} {
            visibility: visible;
        }
    }
`;

const StyledCardContent = styled(CardContent)`
    padding: 10px 10px 0px 10px !important;
`;

export default TrelloCard;
