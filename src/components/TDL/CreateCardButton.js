import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Textarea from 'react-textarea-autosize';
import { isEmptyOrSpaces } from 'lib/fnUtils';

const ListButtonDiv = styled.div`
    cursor: pointer;
    border-radius: 3px;
    height: auto;
    min-height: 38px;
    transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    padding: 0px 8px 8px 8px;
`;

const ActionButton = styled.div`
    color: #5e6c84;
    padding: 6px 8px;
    transition: color 85ms ease-in;
    border-radius: 3px;
    &:hover {
        background-color: hsla(0, 0%, 50%, .24);
    }
`;

const AddIcon = styled(Icon)`
    color: #5e6c84;
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
    opacity: .7;

    &:hover {
        opacity: 1;
    }
`;

const TitleWrapper = styled.div`
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
    text-decoration: none;
`;

const TitleContent = styled.div`
    overflow: hidden;
    padding: 6px 8px 2px;
    position: relative;
`;
const TitleTextArea = styled(({height, ...rest}) => <Textarea {...rest} />)`
    resize: none;
    width: 100%;
    overflow-y: ${props => props.height > 162 ? 'scroll' : 'hidden'};
    overflow-wrap: break-word;
    background: none;
    outline: none;
    border: none;
    height: 54px;
    box-shadow: none;
    margin-bottom: 4px;
    max-height: 162px;
    min-height: 54px;
    padding: 0;
    display: block;
    line-height: 20px;
    border-radius: 3px;
    box-sizing: border-box;
`;

class CreateCardButton extends Component {
    constructor(props) {
        super(props);
        this.textAreaRef = React.createRef();
    }

    state = {
        isEditable: false,
        title: '',
    }

    handleClick = () => {
        const { handleEditing } = this.props;
        handleEditing();

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
        if(isEmptyOrSpaces(e.target.value)) {
            this.clearState();
            return;
        }

        const { createNewCard } = this.props;
        createNewCard(e.target.value);

        this.clearState();
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if(isEmptyOrSpaces(e.target.value)) {
                return;
            }

            this.handleBlur(e);
        }
    }

    clearState() {
        const { handleEditing } = this.props;
        handleEditing();

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
            createNewCard,
        } = this.props;

        const {
            handleChange,
            handleClick,
            handleBlur,
            handleKeyDown
        } = this;

        let textAreaHeight = 0; 
        if(this.textAreaRef.current) {
            textAreaHeight =this.textAreaRef.current.clientHeight;
        }

        return (
            <ListButtonDiv>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(isEmptyOrSpaces(title)) {
                        return;
                    }

                    createNewCard(title);
                    this.clearState();
                }}>
                    { isEditable 
                    ? <TitleWrapper>
                        <TitleContent ref={this.textAreaRef}>
                            <TitleTextArea 
                            placeholder="Enter a title for this card..."
                            height={textAreaHeight}
                            autoFocus
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={title}
                            />
                        </TitleContent>
                    </TitleWrapper> 
                    : <ActionButton onClick={handleClick}>
                            <AddIcon fontSize="small">add</AddIcon>
                            Add a card
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
                                    Add Card
                            </Button>
                            <CloseButton onClick={() => {
                                this.clearState();
                            }}>close</CloseButton>
                        </AddCardButtonGroup> :
                        ''
                    }
                </form>
            </ListButtonDiv>
        )
    }
}

export default CreateCardButton;