import {handleActions, createAction} from 'redux-actions';
import {Map} from 'immutable';

const CHANGE_CONTENT = 'board/CHANGE_CONTENT';
const ADD_BOARD = 'board/ADD_BOARD';

export const changeContent = createAction(CHANGE_CONTENT);
export const addBoard = createAction(ADD_BOARD);

const initialState = Map({
    content: '',
    boardFormOpen: false,
})

export default handleActions({
    [CHANGE_CONTENT]: (state, action) => {
        return state.set('content', action.payload.content);
    },
    [ADD_BOARD]: (state, action) => {
        return state.set('boardFormOpen', action.payload.isOpen);
    },
}, initialState)