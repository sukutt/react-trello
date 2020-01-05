import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CreateButton from './CreateButton';
import { Link } from 'react-router-dom';
import oc from 'open-color';

const RootContainer = styled.div`
    max-width: 1250px;
    padding: 0 0 20px;
    margin: 0 auto;
`;

const GridContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
`;

const BoardHeader = styled(Typography)`
    margin: 0 0 0 40px;
    paddding: 0 0 11px;
    display: flex;
    position: relative;
`;


const StarIcon = styled(StarBorderIcon)`
    vertical-align: middle;
    margin-right: 10px;
`;

const IconSpan = styled.span`
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    margin-left: 4px;
    overflow: hidden;
    position: relative;
    right: -4px;
`;

const FavoriteIcon = styled(({toggled, ...rest}) => <StarBorderIcon {...rest} />)`
    margin-right: ${props => props.toggled ? '6px' : '-2px'};
    color: ${props => props.toggled ? oc.yellow[6] : oc.gray[2]};
    &:hover {
        color: ${oc.yellow[6]};
    }
`;

const FavoriteButton = styled(({toggled, ...rest}) => <span {...rest} />)`
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    flex: 0 0 auto;
    transition: all .2s;
    opacity: ${props => props.toggled ? 1 : 0};
`

const PersonIcon = styled(PersonOutlineIcon)`
    vertical-align: middle;
    margin-right: 10px;
`;

const StyledCard = styled.div`
    display: flex;
    height: 80px;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
`;

const TitleContainer = styled.div`
    flex: 0 0 auto;
    overflow: hidden;
    word-wrap: break-word;
`;

const Title = styled(Typography)`
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const StyledLink = styled(({thumbnail, toggled, ...rest}) => <Link {...rest} />)`
    display: block;
    border-radius: 3px;
    text-decoration: none;
    ${({thumbnail})=> {
        if(thumbnail.includes('image')) {
            return `background-image: ${thumbnail};`;
        } else {
            return `background-color: ${thumbnail};`;
        }
    }}
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    padding: 8px;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
        ${FavoriteButton} {
            transform: translateX(${props => props.toggled ? '0px' : '-8px'});
            opacity: 1;
        }
    }
`;

const BackgroundFade = styled.span`
    display: block;
    background-color: rgba(0, 0, 0, .4);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    border-radius: 3px;
`;

const GridItem = styled.li`
    width: 23.5%;
    padding: 0;
    margin: 0 2% 8px 0;
    transform: translate(0);
    position: relative;
    box-sizing: border-box;

    &:nth-of-type(4n) {
        margin-right: 0;
    }

    @media only screen and (max-width: 711px) {
        width: calc(50% - 4px);
        margin-right: 8px;
        margin-bottom: 8px;

        &:nth-of-type(2n) {
            margin-right: 0;
        }
    }

    @media only screen and (min-width: 712px) and (max-width: 1091px) {
        width: 32%;
        margin-right: 2%;

        &:nth-of-type(3n) {
            margin-right: 0;
        }

        &:nth-of-type(4n) {
            margin-right: 2%;
        }
    }
`;

class GridPanel extends Component {
    render() {
        const { isFavorite, boards, openBoardModal, handleFavorite } = this.props;
        return (
            <RootContainer>
                <BoardHeader variant="subtitle1" gutterBottom={true}>
                    {isFavorite ? <StarIcon /> : <PersonIcon />}
                    {isFavorite ? 'Favorite' : 'Personal'}
                </BoardHeader>
                <GridContainer>
                    {boards.map((value) => (
                        <GridItem key={value._id} item>
                            <StyledLink 
                            to={{
                                pathname: '/tdl',
                                state: {
                                    title: value.title,
                                    boardId: value._id
                                }
                            }}
                            thumbnail={value.thumbnail}
                            toggled={value.favorite} 
                            underline='none'
                            >
                                <BackgroundFade />
                                <StyledCard >
                                    <TitleContainer>
                                        <Title variant="h6">
                                            {value.title}
                                        </Title>
                                    </TitleContainer>
                                    <FavoriteButton toggled={value.favorite}>
                                        <IconSpan>
                                            <FavoriteIcon fontSize='small' toggled={value.favorite} onClick={(e) =>  {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleFavorite({
                                                            id: value._id,
                                                            favorite: !value.favorite
                                                        });
                                                    }
                                                }
                                            />
                                        </IconSpan>
                                    </FavoriteButton>
                                </StyledCard>
                            </StyledLink>
                        </GridItem>
                    ))}
                    {isFavorite ? '' : 
                    <GridItem item>
                        <CreateButton openBoardModal={openBoardModal}/>
                    </GridItem>}
                </GridContainer>
            </RootContainer>
        )
    }
}

export default GridPanel;