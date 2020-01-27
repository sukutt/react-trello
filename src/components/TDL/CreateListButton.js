import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { isEmptyOrSpaces } from 'lib/fnUtils';

const ListButtonDiv = styled.div`
    background-color: hsla(0,0%,100%,.24);
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;
    height: auto;
    min-height: 32px;
    padding: 4px;
    transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
    width: 272px;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;

    &:first-child {
        margin-left: 8px;
    }
`;

const ActionButton = styled(({color, backgroundColor, ...rest}) => <div {...rest} />)`
    color: #fff;
    padding: 6px 8px;
    transition: color 85ms ease-in;
    &:hover {
        opacity: 0.8;
        p {
            text-decoration: underline;
        }
    }
`;

const AddIcon = styled(Icon)`
    vertical-align: bottom;
`;

const AddCardButtonGroup = styled.div`
    margin-top: 6px;
    display: flex;
    align-items: center;
`;

const CloseButton = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
`;

const TitleInput = styled.input`
    background: #fff;
    border: none;
    box-shadow: inset 0 0 0 2px #0079bf;
    display: block;
    margin: 0;
    transition: margin 85ms ease-in,background 85ms ease-in;
    width: 100%;
    color: #172b4d;
    box-sizing: border-box;
    border-radius: 3px;
    line-height: 20px;
    padding: 8px 12px;
    font-size: 14px;
`;

class CreateListButton extends Component {
    state = {
        isEditable: false,
        title: '',
    }

    handleClick = () => {
        this.setState({
            isEditable: true,
        })
    }

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleBlur = (e) => {
        // 새로운 리스트 생성 안함 
        this.clearState();
    }

    clearState() {
        this.setState({
            isEditable: false,
            title: '',
        })
    }

    render() {
        const { 
            isEditable,
            title
        } = this.state;

        const {
            createNewList
        } = this.props;

        const {
            handleChange,
            handleClick,
            handleBlur
        } = this;

        return (
            <ListButtonDiv>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(isEmptyOrSpaces(title)) {
                        return;
                    }

                    createNewList(title);
                    this.clearState();
                }}>
                    { isEditable 
                    ? <TitleInput 
                        type= "text"
                        onChange={handleChange}
                        placeHolder="Enter list title..."
                        onBlur={handleBlur}
                        value={title}
                        autoFocus
                        />
                    : <ActionButton onClick={handleClick} >
                            <AddIcon fontSize="small">add</AddIcon>
                            Add another list
                      </ActionButton> 
                    }
                    { isEditable ?
                        <AddCardButtonGroup>
                            <Button 
                                type="submit"
                                color="primary"
                                size="small"
                                onMouseDown={(e) => {
                                    // blur 방지
                                    e.preventDefault();
                                }}
                                variant="contained">
                                    Add List
                            </Button>
                            <CloseButton>close</CloseButton>
                        </AddCardButtonGroup> :
                        ''
                    }
                </form>
            </ListButtonDiv>
        )
    }
}

export default CreateListButton;