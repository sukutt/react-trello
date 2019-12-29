import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SideNav, GridPanel } from 'components/Boards';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import * as boardsActions from 'store/modules/boards';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const StyledDrawer = styled(Drawer)`
    position: sticky;
    top: 0px;

    > div {
        margin-top: 20px;
        width: 210px;
        position: relative;
        border: none;
        background-color: #fafbfc;
    }

    @media only screen and (max-width: 711px) {
        display: none;
    }
`

const FormContainer = styled.div`
    outline: none;
`;

const ContentDiv = styled.main`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    outline: none;
    padding-top: 55px;
`;

const MemberBoardsView = styled.div`
    background-color: #fafbfc;
    margin: auto;
    flex-grow: 1;
    width: 100%;
`;

const HomeContainer = styled.div`
    min-height: calc(100vh - 48px);
`;

const HomeStickyContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const BoardsDiv = styled.div`
    @media only screen and (max-width: 1091px) and (min-width: 712px) {
        width: 0;
        flex: 1 1 100%;
    }

    margin-top: 40px;
    width: 860px;
`;

const BoardsContentsDiv = styled.div`
    @media only screen and (max-width: 1091px) and (min-width: 712px) {
        padding-left: 40px;
    }

    padding-left: 64px;
`;

const Spacer = styled.div`
    height: 30px;
`;

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .3);
    backdrop-filter: blur(5px);
`;

const StyledPaper = styled(({backgroundKey, backgroundValue, ...rest}) => <div {...rest} />)`
    display: block;
    height: 96px;
    border: none;
    outline: none;
    ${({backgroundKey, backgroundValue}) => {
        return `${backgroundKey}: ${backgroundValue};`;
    }}
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat; 
    border-radius: 3px;
    position: relative;

    &:before {
        display: block;
        content: "";
        background: rgba(0, 0, 0, .15);
        background-color: rgba(0, 0, 0, .4);
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        border-radius: 3px;
    }
`;

const BoardTitleDiv = styled.div`
    display: flex;
`;

const WhiteInput = styled(TextField)`
    input {
        color: white;
        &::placeholder {
            background-color: rgba(0,0,0, .8);
        }
    }
`;

const ButtonDiv = styled.div`
    display: flex;
    padding: 8px 4px 4px 0;

    > button {
        &:disabled {
            background-color: #f5f5f5;
        }
    }
`;

const StyledCloseIcon = styled(CloseIcon)`
    padding-left: 4px;
    color: white;
    position: relative;

    &:hover {
        color: red;
        cursor: pointer;
    }
`

const GridList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    width: 100px;
    height: 96px;
    margin: 0;
    margin-left: 8px;
    padding-left: 0;
`;

const GridListItem = styled.li`
    height: 28px;
    width: 28px;
    margin-bottom: 6px;

    &:nth-child(n+7) {
        margin-bottom: 0;
    }
`;

const GridItemButton = styled(({img, backgroundColor, ...rest}) => <button {...rest} />)`
    background: none;
    background-color: ${props => props.backgroundColor || '#fff'};
    ${props => {
        if(props.img) {
            return `background-image: url(${props.img});`;
        } else {
            return '';
        }
    }}
    background-position: 50%;
    background-size: cover;
    box-shadow: none;
    align-items: center;
    border-radius: 3px;
    color: rgba(0,0,0,.4);
    display: flex;
    height: 100%;
    justify-content: center;
    margin: 0;
    min-height: 0;
    padding: 0;
    position: relative;
    line-height: 0;
    width: 100%;
    cursor: pointer;
    border: none;
    outline: none;

    &:before {
        display: block;
        background: rgba(0,0,0, .15);
        position: absolute;
        content: "";
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        border-radius: 3px;
    }
`;

const GridItemCheck = styled(CheckIcon)`
    color: #fff;
`;

class BoardsContainer extends Component {
    state = {
        open: false,
        title: '',
        disabledButton: true,
        background: {
            id: 0,
            key: 'background-image',
            value: 'url(images/thumbnail-default1.jpg)',
        },
    }

    initialState = {
        open: false,
        title: '',
        disabledButton: true,
        background: {
            id: 0,
            key: 'background-image',
            value: 'url(images/thumbnail-default1.jpg)',
        },
    }

    initBoards = async () => {
        const { BoardsActions } = this.props;
        const { email } = storage.get('signedInInfo');

        try {
            await BoardsActions.getBoards(email);
        } catch (e) {
            console.log(e);
        }

        try {
            await BoardsActions.getBoardImages();
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.initBoards();
    }

    handleFavorite = async ({ id, favorite }) => {
        const { BoardsActions } = this.props;
        try {
            await BoardsActions.toggleFavorite({
                id,
                favorite
            });
        } catch (e) {
            console.log(e);
        }
    } 

    handleSubmit = async (e) => {
        e.preventDefault();

        const { BoardsActions } = this.props;
        const { email } = storage.get('signedInInfo');
        const { title, background } = this.state;
        try {
            await BoardsActions.createBoard({
                thumbnail: background.value,
                email,
                title,
            });
        } catch (e) {
            console.log(e);
        }

        this.setState(this.initialState);
    }

    handleClose = () => {
        this.setState(this.initialState);
    }

    openBoardModal = () => {
        this.setState({
            open: true,
        })
    }

    handleTitleChange = (e) => {
        const { value } = e.target;

        this.setState({
            title: value,
            disabledButton: value.length > 0 ? false : true 
        })
    }

    changeThumbnail = (e) => {
        e.preventDefault();
        const { id, name, value } = e.target;
        this.setState({
            background: {
                id: Number(id),
                key: name,
                value: name === 'background-image' ? `url(${value})` : value,
            },
        })
    }

    render() {
        const { open, title, disabledButton, background } = this.state;
        const list = this.props.list.toJS();
        const tileData = this.props.images.toJS();
        const {
            openBoardModal,
            handleFavorite,
            handleClose,
            handleSubmit,
            handleTitleChange,
            changeThumbnail
        } = this;

        const favoriteList = list.filter(value => value.favorite);
        const personalList = list.filter(value => !value.favorite);

        return (
            <ContentDiv>
                <MemberBoardsView>
                    <HomeContainer>
                        <HomeStickyContainer>
                            <StyledDrawer
                            variant="permanent"
                            >
                                <SideNav />
                            </StyledDrawer>
                            <BoardsDiv>
                                <BoardsContentsDiv>
                                    {favoriteList.length > 0 ?
                                        <React.Fragment>
                                            <GridPanel 
                                            isFavorite={true} 
                                            boards={favoriteList}
                                            handleFavorite={handleFavorite}
                                            >
                                                Favorite
                                            </GridPanel>
                                            <Spacer />
                                        </React.Fragment> : ''
                                    }
                                    <GridPanel 
                                    isFavorite={false} 
                                    boards={personalList} 
                                    openBoardModal={openBoardModal}
                                    handleFavorite={handleFavorite}
                                    >
                                        Personal
                                    </GridPanel>
                                </BoardsContentsDiv>
                            </BoardsDiv>
                            <StyledModal
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <FormContainer>
                                        <form onSubmit={handleSubmit}>
                                            <BoardTitleDiv>
                                                <StyledPaper backgroundKey={background.key} backgroundValue={background.value}>
                                                    <WhiteInput 
                                                        size='small'
                                                        value={title}
                                                        onChange={handleTitleChange}
                                                        autoFocus={true} 
                                                        required={true} 
                                                        variant="filled" 
                                                        placeholder="Add board title" 
                                                    />
                                                    <span>
                                                        <StyledCloseIcon fontSize='small' onClick={handleClose}/>
                                                    </span>
                                                </StyledPaper>
                                                <GridList>
                                                    {tileData.map((value, index) => (
                                                        <GridListItem key={value.img || value.backgroundColor}>
                                                            <GridItemButton id={index} value={value.img || value.backgroundColor} name={value.img ? 'background-image' : 'background-color'} onClick={changeThumbnail} backgroundColor={value.backgroundColor} img={value.img}>
                                                                {index === background.id ? <GridItemCheck /> : ''}
                                                            </GridItemButton>
                                                        </GridListItem>
                                                    ))}
                                                </GridList>
                                            </BoardTitleDiv>
                                            <ButtonDiv>
                                                <Button type="submit" variant="contained" color='primary' disabled={disabledButton}>Create Board</Button>
                                            </ButtonDiv>
                                        </form>
                                    </FormContainer>
                                </Fade>
                            </StyledModal>
                        </HomeStickyContainer>
                    </HomeContainer>
                </MemberBoardsView>
            </ContentDiv>
        )
    }
}

export default connect(
    (state) => ({
        list: state.boards.get('list'),
        images: state.boards.get('images')
    }),
    (dispatch) => ({
        BoardsActions: bindActionCreators(boardsActions, dispatch)
    })
)(BoardsContainer);
