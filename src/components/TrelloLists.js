import React from 'react';
import styled from 'styled-components';
import TrelloListBoard from './TDL/TrelloListBoard';
import ActionButtonContainer from 'containers/ActionButtonContainer';

const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

class TrelloLists extends React.Component {
    render() {
        const {
            list,
            provided,
            onConfirmNewBoard,
        } = this.props;

        const jsxList = list.map((item, index) => {
            return (
                <TrelloListBoard
                item={item}
                key={item.get('id')}
                title={item.get('title')}
                id={item.get('id')}
                cards={item.get('cards')}
                formOpen={item.get('formOpen')}
                index={index}
                />
            )
        })

        return (
            <Body>
                {jsxList}
                {provided.placeholder}
                <ActionButtonContainer isBoard={false} onConfirmNewBoard={onConfirmNewBoard}/>
            </Body>
        )
    }
}

export default TrelloLists;
