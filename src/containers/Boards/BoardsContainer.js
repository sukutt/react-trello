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

const StyledDrawer = styled(Drawer)`
    margin-top: 20px;
    width: 210px;
    position: sticky;
    flex-shrink: 0;
    > div {
        position: relative;
        border: none;
        background-color: #fafbfc;
    }

    @media only screen and (max-width: 711px) {
        display: none;
    }
`

const ContentDiv = styled.main`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    outline: none;
`;

const MemberBoardsView = styled.div`
    background-color: #fafbfc;
    margin: auto;
    flex-grow: 1;
    width: 100%;
`;

const HomeContainer = styled.div`
    min-height: calc(100vh - 40px);
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

const StyledPaper = styled.div`
    border: none;
    padding: 4px;
    outline: none;
    background-image: url(images/thumbnail-work-harder.jpg);
    background-size: cover;
    background-repeat: no-repeat;
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

const BoardTitleDiv = styled.div`
    display: flex;
`;

const WhiteInput = styled(TextField)`
    background-color: rgba(255, 255, 255, 0.2);
    input {
        color: white;
    }
`;

const ButtonDiv = styled.div`
    display: flex;
    padding: 8px 4px 4px 0;
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

class BoardsContainer extends Component {
    state = {
        open: false,
        title: '',
        disabledButton: true 
    }

    initialState = {
        open: false,
        title: '',
        disabledButton: true 
    }

    initBoards = async () => {
        const { BoardsActions } = this.props;
        const { email } = storage.get('signedInInfo');

        try {
            await BoardsActions.getBoards(email);
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
        const { title } = this.state;

        try {
            await BoardsActions.createBoard({
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

    render() {
        const { open, title, disabledButton } = this.state;
        const list = this.props.list.toJS();

        const {
            openBoardModal,
            handleFavorite,
            handleClose,
            handleSubmit,
            handleTitleChange
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
                                    <StyledPaper>
                                    <BackgroundFade />
                                        <form onSubmit={handleSubmit}>
                                            <BoardTitleDiv>
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
                                            </BoardTitleDiv>
                                            <ButtonDiv>
                                                <Button type="submit" variant="contained" color='primary' disabled={disabledButton}>Create Board</Button>
                                            </ButtonDiv>
                                        </form>
                                    </StyledPaper>
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
        list: state.boards.get('list')
    }),
    (dispatch) => ({
        BoardsActions: bindActionCreators(boardsActions, dispatch)
    })
)(BoardsContainer);
