import {handleActions, createAction} from 'redux-actions';
import {Map, List} from 'immutable';

const ADD_CARD = 'board/ADD_CARD';
const CONFIRM_NEW_CARD = 'board/CONFIRM_NEW_CARD';
const CONFIRM_NEW_BOARD = 'board/CONFIRM_NEW_BOARD';
const REORDER = 'board/REORDER';

export const addCard = createAction(ADD_CARD);
export const confirmNewCard = createAction(CONFIRM_NEW_CARD);
export const confirmNewBoard = createAction(CONFIRM_NEW_BOARD);
export const reorder = createAction(REORDER);

let listId = 2;
let cardId = 4;

const initialState = Map({
    list: List([Map({
        id: `list-${0}`,
        title: 'test',
        formOpen: false,
        cards: List([Map({
            id: `card-${0}`,
            content: "It's a test",
        }), Map({
            id: `card-${1}`,
            content: 'sldkjflkjdflkasjd',
        })])
    }), Map({
        id: `list-${1}`,
        title: 'test2',
        formOpen: false,
        cards: List([Map({
            id: `card-${2}`,
            content: "It's a test",
        }), Map({
            id: `card-${3}`,
            content: 'sldkjflkjdflkasjd',
        })])
    })
]),
})

export default handleActions({
    [ADD_CARD]: (state, action) => {
        const list = state.get('list');
        return state.set('list', list.update(
            action.payload.id,
            (item) => item.set('formOpen', action.payload.isOpen)))
    },
    [CONFIRM_NEW_BOARD]: (state, action) => {
        const list = state.get('list');
        return state
            .set('list', list.push(Map({
                id: `list-${listId++}`,
                title: action.payload.title,
                formOpen: false,
                cards: List([]),
        })));
    },
    [CONFIRM_NEW_CARD]: (state, action) => {
        const list = state.get('list');
        return state.set('list', list.update(
            action.payload.id,
            (item) => {
                return item
                .set('cards', item.get('cards').push(Map({
                    id: `card-${cardId++}`,
                    content: action.payload.content,
                })));
            }
        ));
    },

    [REORDER]: (state, action) => {
        const {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId, 
            type
        } = action.payload;

        const numberedStartId = Number(droppableIdStart.split('-')[1]);
        const numberedEndId = Number(droppableIdEnd.split('-')[1]);

        if(type === 'list') {
            const list = state.get('list');

            const draggedItem = list.get(droppableIndexStart);
            return state.set('list', 
                list.delete(droppableIndexStart)
                    .insert(droppableIndexEnd, draggedItem));
        }

        // same list
        if(droppableIdStart === droppableIdEnd) {
            const list = state.get('list');
            return state.set('list', list.update(
                numberedStartId,
                (item) => {
                    const draggedItem = item.get('cards').get(droppableIndexStart);
                    const newCards = item
                            .get('cards')
                            .delete(droppableIndexStart)
                            .insert(droppableIndexEnd, draggedItem);

                    return item.set('cards', newCards);
                }
            ));
        } else {
            const list = state.get('list');
            const startCards = list.get(numberedStartId).get('cards');
            const endCards = list.get(numberedEndId).get('cards');

            const draggedItem = startCards.get(droppableIndexStart);

            const deletedCards = startCards.delete(droppableIndexStart);
            const addedCards = endCards.insert(droppableIndexEnd, draggedItem);

            return state.setIn(['list', numberedStartId, 'cards'], deletedCards)
                        .setIn(['list', numberedEndId, 'cards'], addedCards);
        }
    }
}, initialState)