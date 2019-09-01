import React from 'react';
import styled from 'styled-components';
import TrelloListBoard from './TrelloListBoard';
import ActionButtonContainer from '../containers/ActionButtonContainer';

class TrelloLists extends React.Component {
    render() {
        const {
            list,
            onAddCard,
            onCancelAddingCard,
            onConfirmNewCard,
            onConfirmNewBoard
        } = this.props;

        const jsxList = list.map((item) => {
            return (
                <TrelloListBoard
                title={item.get('title')}
                key={item.get('id')}
                id={item.get('id')}
                cards={item.get('cards')}
                formOpen={item.get('formOpen')}
                onAddCard={onAddCard}
                onCancelAddingCard={onCancelAddingCard}
                onConfirmNewCard={onConfirmNewCard}
                />
            )
        })

        return (
            <Body>
                {jsxList}
                <ActionButtonContainer isBoard={false} onConfirmNewBoard={onConfirmNewBoard}/>
            </Body>
        )
    }
}

const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

export default TrelloLists;
