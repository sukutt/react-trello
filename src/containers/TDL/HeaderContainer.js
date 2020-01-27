import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tdlBoardActions from 'store/modules/lists';
import * as boardsActions from 'store/modules/boards';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { isEmptyOrSpaces } from 'lib/fnUtils';
import AutosizeInput from 'react-input-autosize';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';

const DrawerMenuButtonDiv = styled.div`
    display: block;
`;

const LeftMenuDiv = styled.div`
    display: flex;
    min-width: 0;
    cursor: pointer;
`;

const TitleDiv = styled.div`
    line-height: 32px;
    padding: 0;
    text-decoration: none;
    max-width: calc(100% - 24px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 3px;
    height: 32px;
    margin: 0 4px 4px 0;
    border: 0;
    outline: 0;

    &:hover {
        background: hsla(0,0%,100%,.24);
    }
`;

const CenteredTypography = styled(({isEditable, ...rest}) => <Typography {...rest} />)`
    display: ${props => props.isEditable ? 'none' : 'block'};
    padding: 0 12px;
    color: white;
    max-width: calc(100% - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const TitleInput = styled(AutosizeInput)`
    > input {
        color: #172b4d;
        border-radius: 3px;
        line-height: 20px;
        background-color: #fff;
        border: 0;
        padding: 0 12px;
        font-weight: 700;
        font-size: 18px;
        height: 32px;

        &:focus {
            background: #fff;
            border: none;
            box-shadow: inset 0 0 0 2px #0079bf;
            outline: 0;
        }
    }
`;

const RightMenuDiv = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
`;

const DrawerMenuButton = styled(Button)`
    &&& {
        background: rgba(19, 21, 22, .24);
        color: white;
    }
`;

const VerticalDivider =  styled.span`
    border-left: 1px solid hsla(0,0%,100%,.24);
    border-left-color: rgba(47, 47, 47, 0.24);
    height: 16px;
    margin: 8px 8px 12px 4px;
`;

const FavoriteButton = styled.div`
    border-radius: 3px;
    background: rgba(19,21,22,.24);
    cursor: default;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    margin: 0 4px 4px 0;
    overflow: hidden;
    padding-left: 32px;
    position: relative;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        background:rgba(19,21,22,.24);
    }
`;

const StarIcon = styled(({isFavorite, ...rest}) => <StarBorderRoundedIcon {...rest} />)`
    color: ${props => props.isFavorite ? 'rgb(255, 237, 56)' : 'white'};
    padding: 6px;
    position: absolute;
    top: 0;
    left: 0;
`;

const Main = styled.div`
    position: fixed;
    top: 40px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    height: 40px;
    width: 100%;
    padding: 8px 10px 5px;
    color: #fbfbfb;
`;

const useStyles = theme => ({
    visible: {
        display: 'block !important',
    },
    boardMenuBtn: {
        display: 'none'
    }
});

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    state = {
        title: '',
        originalTitle: '',
        changeDiv: false,
        favorite: false,
    }

    componentDidMount() {
        const { isFavorite } = this.props;

        this.setState({
            title: this.props.title,
            originalTitle: this.props.title,
            favorite: isFavorite,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.changeDiv && this.state.changeDiv) {
            this.inputRef.current.select();
        }
    }

    handleTitleClick = () => {
        // display div 숨기고, input 열기
        this.setState({
            changeDiv: true,
        });
    }

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleBlur = async (e) => {
        if(isEmptyOrSpaces(e.target.value) || e.target.value === this.state.originalTitle) {
            this.setState({
                title: this.state.originalTitle,
                changeDiv: false,
            })

            return;
        }

        const { BoardsActions } = this.props;

        // 타이틀 변경
        try {
            await BoardsActions.updateTitle({
                id: this.props.boardId,
                title: e.target.value,
            })
        } catch (e) {
            console.log(e);
        }

        this.setState({
            changeDiv: false,
        })
    }

    handleKeyPress = (e) => {
        // 타이틀 변경 
        if (e.key === 'Enter') {
            this.handleBlur(e);
        }
    }

    handleFavorite = async (e) => {
        const { BoardsActions, boardId } = this.props;
        const { favorite } = this.state;

        try {
            await BoardsActions.toggleFavorite({
                id: boardId,
                favorite: !favorite
            });
        } catch (e) {
            console.log(e);
        }

        this.setState(prevState => ({favorite: !prevState.favorite}));
    }

    render() {
        const { 
            classes, 
            handleBoardAction,
            boardMenuOpen
         } = this.props;

        const {
            title,
            changeDiv,
            favorite
        } = this.state;

        const {
            handleBlur,
            handleTitleClick,
            handleChange,
            handleKeyPress,
            handleFavorite
        } = this;

        return (
            <Main>
                <LeftMenuDiv>
                    <TitleDiv onClick={handleTitleClick}>
                        <CenteredTypography variant='h6' isEditable={changeDiv}>
                            {title}
                        </CenteredTypography>
                        <TitleInput
                            type='text'
                            style={{ display: 'none' }}
                            className={changeDiv ? classes.visible : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyPress}
                            value={title}
                            ref={this.inputRef}
                        />
                    </TitleDiv>
                    <FavoriteButton >
                        <StarIcon isFavorite={favorite} fontSize="small"onClick={handleFavorite} />
                    </FavoriteButton>
                    <VerticalDivider />
                </LeftMenuDiv>
                <RightMenuDiv>
                    <DrawerMenuButtonDiv>
                        <DrawerMenuButton
                            className={boardMenuOpen ? classes.boardMenuBtn : ''}
                            size="small"
                            variant="contained"
                            startIcon={<MoreHorizIcon/>}
                            onClick={handleBoardAction}
                        >
                            Show Menu
                        </DrawerMenuButton>
                    </DrawerMenuButtonDiv>
                </RightMenuDiv>
            </Main>
        )
    }
}

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        TDLBoardActions: bindActionCreators(tdlBoardActions, dispatch),
        BoardsActions: bindActionCreators(boardsActions, dispatch)
    })
)(withStyles(useStyles)(HeaderContainer));