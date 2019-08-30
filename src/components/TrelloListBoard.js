import React from 'react';
import styled from 'styled-components';
import TrelloCard from './TrelloCard';
import TrelloActionButton from '../components/TrelloActionButton'

class TrelloListBoard extends React.Component {
    render() {
        const {title, id, cards, formOpen, onAddCard} = this.props;
        const jsxList = cards.map((item) => {
            return (
                <TrelloCard
                content={item.content}
                key={item.id}
                />
            )
        });

        return (
            <BoardDiv>
                <CardDiv>
                    <HeaderDiv>{title}</HeaderDiv>
                    {jsxList}
                </CardDiv>
                <TrelloActionButton formOpen={formOpen} onAddCard={onAddCard} id={id}/>
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
    padding: 8px 8px 0px 8px;
`;

const BoardDiv = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    margin-right: 8px;
`;

export default TrelloListBoard;