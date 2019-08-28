import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';

const TrelloCard = ({content}) => {
    return (
        <StyledCard>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {content}
                </Typography>
            </CardContent>
        </StyledCard>
    )
}

const StyledCard = styled(Card)`
    margin-bottom: 8px;
`;

export default TrelloCard;
