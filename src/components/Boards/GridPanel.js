import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CreateButton from './CreateButton';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import oc from 'open-color';

const RootContainer = styled(Grid)`
    flex-grow: 1;
`;

const StarIcon = styled(StarBorderIcon)`
    vertical-align: middle;
    margin-right: 10px;
`;

const FavoriteIcon = styled(({toggled, ...rest}) => <StarBorderIcon {...rest} />)`
    color: ${props => props.toggled ? oc.yellow[6] : oc.gray[2]};
    &:hover {
        color: ${oc.yellow[6]};
    }
`;

const FavoriteButton = styled(({toggled, ...rest}) => <CardActions {...rest} />)`
    transform: translateX(${props => props.toggled ? '0px' : '30px'});
    float: right;
    transition: all .3s;
`

const PersonIcon = styled(PersonOutlineIcon)`
    vertical-align: middle;
    margin-right: 10px;
`;

const StyledCard = styled(Card)`
    height: 96px;
    width: 206px;
    background: #97a0af!important;

    &:hover {
        cursor: pointer;
        opacity: 0.9;

        ${FavoriteButton} {
            transform: translateX(0px);
        }
    }
`;

const TitleContainer = styled(CardContent)`
    padding: 8px !important;
    margin-bottom: 8px;
`;

const Title = styled(Typography)`
    color: white;
`

class GridPanel extends Component {
    render() {
        const { isFavorite, boards, openBoardModal, handleFavorite, handleOpenBoard } = this.props;
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
                                    <StyledCard onClick={handleOpenBoard}>
                                        <TitleContainer>
                                            <Title variant="h6">
                                                {value.title}
                                            </Title>
                                        </TitleContainer>
                                        <FavoriteButton toggled={value.favorite} disableSpacing>
                                            <FavoriteIcon toggled={value.favorite} onClick={(e) =>  {
                                                        e.stopPropagation();
                                                        handleFavorite({
                                                            id: value._id,
                                                            favorite: !value.favorite
                                                        });
                                                    }
                                                }
                                            />
                                        </FavoriteButton>
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