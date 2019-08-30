import React from 'react';
import styled from 'styled-components';
import TrelloCard from './TrelloCard';
import AddButtonContainer from '../containers/AddButtonContainer'

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
            <CardDiv>
                <HeaderDiv>{title}</HeaderDiv>
                {jsxList}
            </CardDiv>
            <AddButtonContainer/>
        </BoardDiv>
    )
}

const HeaderDiv = styled.div`
    padding: 8px;
    font-weight: 600;
    font-size: 16px;
`;

const CardDiv = styled.div`
    padding: 8px;
`;

const BoardDiv = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    margin-right: 8px;
`;

export default TrelloListBoard;