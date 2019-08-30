import React from 'react';
import styled from 'styled-components';
import TrelloListBoard from './TrelloListBoard';

const TrelloLists = ({ list, onAddCard }) => {
    const jsxList = list.map((item) => {
        return (
            <TrelloListBoard
            title={item.get('title')}
            key={item.get('id')}
            id={item.get('id')}
            cards={item.get('cards')}
            formOpen={item.get('formOpen')}
            onAddCard={onAddCard}
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
