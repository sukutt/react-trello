import React from 'react';
import styled from 'styled-components';
import TrelloCard from './TrelloCard';

const TrelloListBoard = ({ title }) => {
    return (
        <BoardDiv>
            <h4>{title}</h4>
            <TrelloCard />
        </BoardDiv>
    )
}

const BoardDiv = styled.div`
    background-color: #ccc;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
`;

export default TrelloListBoard;