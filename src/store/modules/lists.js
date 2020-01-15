import {handleActions, createAction} from 'redux-actions';
import * as ListsAPI from 'lib/api/lists';
import {Map, List} from 'immutable';
import { pender } from 'redux-pender';

const EDIT_CARD = 'list/EDIT_CARD';
const CONFIRM_NEW_CARD = 'list/CONFIRM_NEW_CARD';
const CONFIRM_NEW_LIST = 'list/CONFIRM_NEW_LIST';
const GET_LISTS = 'list/GET_LISTS';
const REORDER = 'list/REORDER';
const REORDER_UI = 'list/REORDER_UI';
const GET_CARDS = 'list/GET_CARDS';
const UPDATE_LIST = 'list/UPDATE_LIST';

export const getLists = createAction(GET_LISTS, ListsAPI.getLists);
export const getCards = createAction(GET_CARDS);
export const editCard = createAction(EDIT_CARD);
export const confirmNewCard = createAction(CONFIRM_NEW_CARD, ListsAPI.createNewCard);
export const confirmNewList = createAction(CONFIRM_NEW_LIST, ListsAPI.createNewList);
export const reorderUI = createAction(REORDER_UI);
export const reorder = createAction(REORDER, ListsAPI.reorder);
export const updateList = createAction(UPDATE_LIST, ListsAPI.updateList);

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
                    _id: value._id,
                    title: value.title,
                    order: value.order,
                    cards: List(mappedCards || []),
                });
            });

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
                _id: newList._id,
                title: newList.title,
                order: newList.order,
                cards: List([])
            })));
        }
    }),

    ...pender({
        type: CONFIRM_NEW_CARD,
        onSuccess: (state, action) => {
            const newCard = action.payload.data;
            const list = state.get('list');

            const index = list.findIndex(item => item.get('_id') === newCard.list_id);
            const newList = list.update(index, item => item.set('cards', item.get('cards').push(Map({
                    _id: newCard._id,
                    list_id: newCard.list_id,
                    content: newCard.content,
                    order: newCard.order,
            }))));
            return state.set('list', newList);
        }
    }),

    ...pender({
        type: UPDATE_LIST,
        onSuccess: (state, action) => {
            const updatedList = action.payload.data;
            const index = state.get('list').findIndex(list=> list.get('_id') === updatedList._id);
            const newList = state.get('list').update(index, list => list.merge(updatedList));
            return state.set('list', newList);
        }
    }),

    [REORDER_UI]: (state, action) => {
        const { 
            type,
            newOrderedList,
            source,
            destination,
            draggableId
        } = action.payload;

        if(type === 'list') {
            return state.set('list', newOrderedList);
        } else {
            const list = state.get('list');

            if (source.droppableId === destination.droppableId) {
                const sourceIndex = list.findIndex(item => item.get('_id') === source.droppableId);

                return state.set('list', list.update(
                    sourceIndex,
                    (item) => {
                    const draggedItem = item.get('cards').get(source.index);
                    const newCards = item
                            .get('cards')
                            .delete(source.index)
                            .insert(destination.index, draggedItem);

                        return item.set('cards', newCards);
                    }
                ));
            } else {
                const currentStartIndex = list.findIndex((item) => {
                    return item.get('_id') === source.droppableId;
                });

                const currentEndIndex = list.findIndex((item) => {
                    return item.get('_id') === destination.droppableId;
                });

                const startCards = list.get(currentStartIndex).get('cards');
                const endCards = list.get(currentEndIndex).get('cards');

                const draggedItemIndex = startCards.findIndex(item => item.get('_id') === draggableId);
                const draggedItem = startCards.get(draggedItemIndex);

                const deletedCards = startCards.delete(source.index);
                const addedCards = endCards.insert(destination.index, draggedItem);

                return state.setIn(['list', currentStartIndex, 'cards'], deletedCards)
                            .setIn(['list', currentEndIndex, 'cards'], addedCards);
            }
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