import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TrelloCard = ({content, id, index}) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <StyledCard>
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

const StyledCard = styled(Card)`
    margin-bottom: 8px;
`;

const StyledCardContent = styled(CardContent)`
    padding: 10px 10px 0px 10px !important;
`;

export default TrelloCard;
