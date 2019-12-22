import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const StyledCard = styled(Card)`
    height: 96px;
    background: #f1f6f9 !important;
`;

const StyledCardActionArea = styled(CardActionArea)`
    height: 100%;
`;

const CenteredTypography = styled(Typography)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CreateButton = ({openBoardModal}) => (
    <StyledCard>
        <StyledCardActionArea onClick={openBoardModal}>
            <CardContent>
                <CenteredTypography  color="primary" variant="subtitle1">
                    Create new board
                </CenteredTypography>
            </CardContent>
        </StyledCardActionArea>
    </StyledCard>
);

export default CreateButton;