import React from 'react';
import styled from 'styled-components';
import TrelloListBoard from './TrelloListBoard';

const TrelloLists = ({list}) => {
    const jsxList = list.map((item) => {
        return (
            <TrelloListBoard
            title={item.title}
            key={item.id}
            cards={item.cards}
            />
        )
    })

    return (
        <Body>
            {jsxList}
        </Body>
    )
}

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

export default TrelloLists;
