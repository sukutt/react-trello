import {handleActions, createAction} from 'redux-actions';
import {Map} from 'immutable';

const CHANGE_CONTENT = 'board/CHANGE_CONTENT';
const RESET = 'board/RESET';
const ADD_BOARD = 'board/ADD_BOARD';
const CANCEL_ADDING_BOARD = 'board/CANCEL_ADDING_BOARD';

export const changeContent = createAction(CHANGE_CONTENT);
export const reset = createAction(RESET);
export const addBoard = createAction(ADD_BOARD);
export const cancelAddingBoard = createAction(CANCEL_ADDING_BOARD);

const initialState = Map({
    content: '',
    boardFormOpen: false,
})

export default handleActions({
    [CHANGE_CONTENT]: (state, action) => {
        return state.set('content', action.payload.content);
    },
    [ADD_BOARD]: (state) => {
        return state.set('boardFormOpen', true);
    },
    [CANCEL_ADDING_BOARD]: (state) => {
        return state.set('boardFormOpen', false);
    },
    [RESET]: (state) => {
        return state.set('content', '');
    }

}, initialState)