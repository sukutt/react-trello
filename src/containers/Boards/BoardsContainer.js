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

const BoardsDiv = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const StyledDrawer = styled(Drawer)`
    width: 240px;
    flexShrink: 0;
    > div {
        position: relative;
        border: none;
    }
`
const Main = styled.main`
    flex-grow: 1;
    padding: 10px;
`;

const Spacer = styled.div`
    height: 30px;
`;

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(5px);
`;

const StyledPaper = styled.div`
    border: none;
    padding: 4px;
    outline: none;
`;

const BoardTitleDiv = styled.div`
    display: flex;
`;

const WhiteInput = styled(TextField)`
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

    handleOpenBoard = async (e) => {
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
            handleOpenBoard,
            handleClose,
            handleSubmit,
            handleTitleChange
        } = this;

        const favoriteList = list.filter(value => value.favorite);
        const personalList = list.filter(value => !value.favorite);

        return (
            <BoardsDiv>
                <StyledDrawer
                variant="permanent"
                >
                    <SideNav />
                </StyledDrawer>
                <Main>
                    {favoriteList.length > 0 ?
                        <React.Fragment>
                            <GridPanel 
                            isFavorite={true} 
                            boards={favoriteList}
                            handleFavorite={handleFavorite}
                            handleOpenBoard={handleOpenBoard}
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
                    handleOpenBoard={handleOpenBoard}
                    >
                        Personal
                    </GridPanel>
                </Main>
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
            </BoardsDiv>
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
