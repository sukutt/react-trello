import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Textarea from 'react-textarea-autosize';

const ListButtonDiv = styled.div`
    background-color: hsla(0,0%,100%,.24);
    cursor: pointer;
    border-radius: 3px;
    height: auto;
    min-height: 32px;
    padding: 4px;
    transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
    margin-right: 8px;
    width: 280px;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
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
    z-index: 0;
`;

const TitleContent = styled.div`
    overflow: hidden;
    padding: 6px 8px 2px;
    position: relative;
    z-index: 10;
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
        if(!e.target.value) {
            this.clearState();
        }

        const { createNewCard } = this.props;
        createNewCard(e.target.value);
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
            createNewCard
        } = this.props;

        const {
            handleChange,
            handleClick,
            handleBlur
        } = this;

        let textAreaHeight = 0; 
        if(this.textAreaRef.current) {
            textAreaHeight =this.textAreaRef.current.clientHeight;
        }

        return (
            <ListButtonDiv>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createNewCard(title);

                    this.clearState();
                }}>
                    { isEditable 
                    ? <TitleWrapper>
                        <TitleContent ref={this.textAreaRef}>
                            <TitleTextArea 
                            type= "text"
                            placeholder="Enter a title for this card..."
                            height={textAreaHeight}
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={title}
                            />
                        </TitleContent>
                    </TitleWrapper> 
                    : <ActionButton onClick={handleClick} >
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