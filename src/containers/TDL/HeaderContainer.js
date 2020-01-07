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

const Main = styled.div`
    height: auto;
    background-color: rgba(0,0,0,.24);
    padding: 8px 4px 4px 8px;
    position: relative;
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
    display: none;

    > input {
        color: #172b4d;
        border-radius: 3px;
        line-height: 20px;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
        background-color: #fff;
        border: 0;
        margin: 0;
        padding: 0 12px;
        font-weight: 700;
        font-size: 18px;
        height: 32px;

        &:focus {
            background: #fff;
            border: none;
            box-shadow: inset 0 0 0 2px #0079bf;
            outline: 0
        }
    }
`;

const TitleDiv = styled.div`
    background: transparent;
    cursor: default;
    font-size: 18px;
    font-weight: 700;
    line-height: 32px;
    padding: 0;
    text-decoration: none;
    max-width: calc(100% - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 3px;
    color: #fff;
    float: left;
    height: 32px;
    margin: 0 4px 4px 0;
    position: relative;

    &:hover {
        background: hsla(0,0%,100%,.24);
        cursor: pointer;
    }
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const useStyles = theme => ({
    visible: {
        display: 'block',
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
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            originalTitle: this.props.title
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

    render() {
        const { classes } = this.props;

        const {
            title,
            changeDiv
        } = this.state;

        const {
            handleBlur,
            handleTitleClick,
            handleChange,
            handleKeyPress
        } = this;

        return (
            <Main>
                <TitleDiv onClick={handleTitleClick}>
                    <CenteredTypography variant='h6' isEditable={changeDiv}>
                        {title}
                    </CenteredTypography>
                    <TitleInput
                        type='text'
                        className={changeDiv ? classes.visible : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                        value={title}
                        ref={this.inputRef}
                    />
                </TitleDiv>
                <Spacer />
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