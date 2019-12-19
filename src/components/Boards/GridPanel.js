import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CreateButton from './CreateButton';
import Card from '@material-ui/core/Card';

const StyledCard = styled(Card)`
    height: 96px;
    width: 206px;
    background: #97a0af!important;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const RootContainer = styled(Grid)`
    flex-grow: 1;
`;

const StarIcon = styled(StarBorderIcon)`
    vertical-align: middle;
    margin-right: 10px;
`;

const PersonIcon = styled(PersonOutlineIcon)`
    vertical-align: middle;
    margin-right: 10px;
`;

class GridPanel extends Component {
    openBoard = () => {
        console.log('test');
    }

    render() {
        const { isFavorite, boards, openBoardModal } = this.props;
        return (
            <div>
                <Typography variant="subtitle1" gutterBottom={true}>
                    {isFavorite ? <StarIcon /> : <PersonIcon />}
                    {isFavorite ? 'Favorite' : 'Personal'}
                </Typography>
                <RootContainer container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {boards.map((value) => (
                                <Grid key={value._id} item>
                                    <StyledCard onClick={this.openBoard}>
                                        {value.title}
                                    </StyledCard>
                                </Grid>
                            ))}
                            {isFavorite ? '' : 
                            <Grid item>
                                <CreateButton openBoardModal={openBoardModal}/>
                            </Grid>}
                        </Grid>
                    </Grid>
                </RootContainer>
            </div>
        )
    }
}

export default GridPanel;