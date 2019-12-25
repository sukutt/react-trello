import React from 'react';
import styled from 'styled-components';
import CardContainer from 'containers/CardContainer';
import ActionButtonContainer from 'containers/ActionButtonContainer';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class TrelloListBoard extends React.Component {
    render() {
        const {
            title,
            id,
            cards,
            formOpen,
            index: listIndex,
        } = this.props;

        const jsxList = cards.map((item, index) => {
            return (
                <CardContainer
                content={item.get('content')}
                listIndex={listIndex}
                key={item.get('id')}
                id={item.get('id')}
                index={index}
                />
            )
        });

        return (
            <Draggable draggableId={String(id)} index={listIndex}>
                {provided => (
                    <BoardDiv 
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                        <Droppable droppableId={String(id)}>
                            {provided => (
                                <div {...provided.droppableProps} 
                                ref={provided.innerRef}
                                >
                                    <CardDiv>
                                        <HeaderDiv>{title}</HeaderDiv>
                                        {jsxList}
                                    </CardDiv>
                                    {provided.placeholder}
                                    <ActionButtonContainer 
                                    formOpen={formOpen} 
                                    id={id}
                                    />
                                </div>
                            )}
                        </Droppable>
                    </BoardDiv>
                )}
            </Draggable>
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
    height: 100%;
    margin-right: 8px;
`;

export default TrelloListBoard;