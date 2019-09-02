import {handleActions, createAction} from 'redux-actions';
import {Map, List} from 'immutable';

const ADD_CARD = 'board/ADD_CARD';
const CONFIRM_NEW_CARD = 'board/CONFIRM_NEW_CARD';
const CONFIRM_NEW_BOARD = 'board/CONFIRM_NEW_BOARD';

export const addCard = createAction(ADD_CARD);
export const confirmNewCard = createAction(CONFIRM_NEW_CARD);
export const confirmNewBoard = createAction(CONFIRM_NEW_BOARD);

const initialState = Map({
    listId: 2,
    list: List([Map({
        id: 0,
        title: 'test',
        formOpen: false,
        cardId: 2,
        cards: List([Map({
            id: 0,
            content: "It's a test",
        }), Map({
            id: 1,
            content: 'sldkjflkjdflkasjd',
        })])
    }), Map({
        id: 1,
        title: 'test2',
        formOpen: false,
        cardId: 2,
        cards: List([Map({
            id: 0,
            content: "It's a test",
        }), Map({
            id: 1,
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
        const listId = state.get('listId');
        const list = state.get('list');

        return state
            .set('listId', listId + 1)
            .set('list', list.push(Map({
                id: listId,
                title: action.payload.title,
                cardId: 0,
                formOpen: false,
                cards: List([]),
        })));
    },
    [CONFIRM_NEW_CARD]: (state, action) => {
        const list = state.get('list');
        return state.set('list', list.update(
            action.payload.id,
            (item) => {
                const newId = item.get('cardId');
                return item
                .set('cardId', newId + 1)
                .set('cards', item.get('cards').push(Map({
                    id: newId,
                    content: action.payload.content,
                })));
            }
        ));
    },
}, initialState)