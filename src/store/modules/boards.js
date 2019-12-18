import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';
import * as BoardsAPI from 'lib/api/boards';
import { pender } from 'redux-pender';

const GET_BOARDS = 'boards/GET_BOARDS';
const CREATE = 'boards/CREATE';
const TOGGLE_FAVORITE = 'boards/TOGGLE_FAVORTIE';

export const getBoards = createAction(GET_BOARDS, BoardsAPI.getBoards);
export const create = createAction(CREATE);
export const toggleFavorite = createAction(TOGGLE_FAVORITE);

const initialState = Map({
    list: List([]),
})

export default handleActions({
    [TOGGLE_FAVORITE]: (state, action) => {
        const index = state.get('list').findIndex(board=> board.get('id') === action.payload);
        return state.get('list').update(index, board => board.set('favorite', !board.get('favorite')));
    },

    ...pender({
        type: GET_BOARDS,
        onSuccess: (state, action) => state.set('list', List(action.payload.data))
    })
}, initialState)
