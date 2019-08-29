import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

class TrelloActionButton extends Component {
    render() {
        const {list} = this.props;
        const buttonText = list ? "Add another list" : "Add another card";
        return (
            <Button>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </Button>
        )
    }
}

const Button = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 24px;
    padding: 8px;
    color: ${props => props.list ? "white" : "inherit"};
    opacity: ${props => props.list ? 1 : 0.5};
    background-color: ${props => props.list ? "rgba(0,0,0,.15)" : "inherit"};
    &:hover {
        background-color: rgba(9,30,66,.13);
        p {
            text-decoration: underline;
        }
    }
`;


export default TrelloActionButton;