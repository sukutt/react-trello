import React from 'react';
import styled from 'styled-components';
import TrelloCard from './TrelloCard';
import ActionButtonContainer from '../containers/ActionButtonContainer';

class TrelloListBoard extends React.Component {
    shouldComponentUpdate = (nextProps) => {
        if(this.props.formOpen !== nextProps.formOpen) {
            return true;
        }

        return false;
    }

    render() {
        const {
            title,
            id,
            cards,
            formOpen,
        } = this.props;

        const jsxList = cards.map((item) => {
            return (
                <TrelloCard
                content={item.get('content')}
                key={item.get('id')}
                />
            )
        });

        return (
            <BoardDiv>
                <CardDiv>
                    <HeaderDiv>{title}</HeaderDiv>
                    {jsxList}
                </CardDiv>
                <ActionButtonContainer 
                formOpen={formOpen} 
                id={id}
                />
            </BoardDiv>
        )
    }
}

const HeaderDiv = styled.div`
    padding: 8px;
    font-weight: 600;
    font-size: 16px;
`;

const CardDiv = styled.div`
    padding: 0px 8px 0px 8px;
`;

const BoardDiv = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    width: 300px;
    margin-right: 8px;
`;

export default TrelloListBoard;