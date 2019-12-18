import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const RootContainer = styled(Grid)`
    flex-grow: 1;
`;

const ContentPaper = styled(Paper)`
    height: 140px;
    width: 100px;
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
    render() {
        const { isFavorite, boards } = this.props;
        return (
            <div>
                <Typography variant="subtitle1" gutterBottom={true}>
                    {isFavorite ? <StarIcon /> : <PersonIcon />}
                    {isFavorite ? 'Favorite' : 'Personal'}
                </Typography>
                <RootContainer container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {boards.map(value => (
                            <Grid key={value} item>
                                <ContentPaper />
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </RootContainer>
            </div>
        )
    }
}

export default GridPanel;