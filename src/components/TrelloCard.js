import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';

const TrelloCard = ({content}) => {
    return (
        <StyledCard>
            <StyledCardContent>
                <Typography color="textSecondary" gutterBottom>
                    {content}
                </Typography>
            </StyledCardContent>
        </StyledCard>
    )
}

const StyledCard = styled(Card)`
    margin-bottom: 8px;
`;

const StyledCardContent = styled(CardContent)`
    padding: 10px 10px 0px 10px !important;
`;

export default TrelloCard;
