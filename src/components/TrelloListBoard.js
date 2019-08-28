import React from 'react';
import styled from 'styled-components';
import TrelloCard from './TrelloCard';

const TrelloListBoard = ({ title, cards }) => {
    const jsxList = cards.map((item) => {
        return (
            <TrelloCard
            content={item.content}
            key={item.id}
            />
        )
    })
    return (
        <BoardDiv>
            <h4>{title}</h4>
            {jsxList}
        </BoardDiv>
    )
}

const BoardDiv = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    margin-right: 8px;
`;

export default TrelloListBoard;