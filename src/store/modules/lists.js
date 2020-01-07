import {handleActions, createAction} from 'redux-actions';
import * as ListsAPI from 'lib/api/lists';
import {Map, List} from 'immutable';
import { pender } from 'redux-pender';

const EDIT_CARD = 'list/EDIT_CARD';
const CONFIRM_NEW_CARD = 'list/CONFIRM_NEW_CARD';
const CONFIRM_NEW_LIST = 'list/CONFIRM_NEW_LIST';
const GET_LISTS = 'list/GET_LISTS';
const REORDER = 'list/REORDER';
const GET_CARDS = 'list/GET_CARDS';

export const getLists = createAction(GET_LISTS, ListsAPI.getLists);
export const getCards = createAction(GET_CARDS);
export const editCard = createAction(EDIT_CARD);
export const confirmNewCard = createAction(CONFIRM_NEW_CARD, ListsAPI.createNewCard);
export const confirmNewList = createAction(CONFIRM_NEW_LIST, ListsAPI.createNewList);
export const reorder = createAction(REORDER);

const initialState = Map({
    boardId: '',
    list: List([]),
})

export default handleActions({
    ...pender({
        type: GET_LISTS,
        onSuccess: (state, action) => {
            const { boardId, list } = action.payload.data;
            const immutableList = list.map((value) => {
                const mappedCards = value.cards.map((card) => Map(card));
                return Map({
                    id: value.id,
                    title: value.title,
                    cards: List(mappedCards),
                });
            })

            return state
            .set('boardId', boardId)
            .set('list', List(immutableList))
        }
    }),

    ...pender({
        type: CONFIRM_NEW_LIST,
        onSuccess: (state, action) => {
            const newList = action.payload.data;
            const list = state.get('list');
            return state.set('list', list.push(Map({
                id: newList._id,
                title: newList.title,
                cards: List([])
            })));
        }
    }),

    ...pender({
        type: CONFIRM_NEW_CARD,
        onSuccess: (state, action) => {
            const newCard = action.payload.data;
            const list = state.get('list');

            const index = list.findIndex(item => item.get('id') === newCard.list_id);
            const newList = list.update(index, item => item.set('cards', item.get('cards').push(Map({
                    _id: newCard._id,
                    list_id: newCard.list_id,
                    content: newCard.content,
                    next: newCard.next,
            }))));

            return state.set('list', newList);
        }
    }),

    [REORDER]: (state, action) => {
        const {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            type
        } = action.payload;


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
                Number(droppableIdStart.split('-')[1]),
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
            const currentStartIndex = list.findIndex((item) => {
                return item.get('id') === droppableIdStart;
            });

            const currentEndIndex = list.findIndex((item) => {
                return item.get('id') === droppableIdEnd;
            });

            const startCards = list.get(currentStartIndex).get('cards');
            const endCards = list.get(currentEndIndex).get('cards');

            const draggedItem = startCards.get(droppableIndexStart);

            const deletedCards = startCards.delete(droppableIndexStart);
            const addedCards = endCards.insert(droppableIndexEnd, draggedItem);

            return state.setIn(['list', currentStartIndex, 'cards'], deletedCards)
                        .setIn(['list', currentEndIndex, 'cards'], addedCards);
        }
    },

    [EDIT_CARD]: (state, action) => {
        const {listIndex, index, text} = action.payload;
        const card = state.get('list')
                          .get(listIndex)
                          .get('cards')
                          .get(index);

        return state.setIn(['list', listIndex, 'cards', index], Map({
            ...card.toJS(),
            content: text,
        }));
    }
}, initialState)