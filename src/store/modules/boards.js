import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';

const GET_BOARDS = 'boards/GET_BOARDS';
const CREATE = 'boards/CREATE';
const TOGGLE_FAVORITE = 'boards/TOGGLE_FAVORTIE';

export const getBoards = createAction(GET_BOARDS);
export const create = createAction(CREATE);
export const toggleFavorite = createAction(TOGGLE_FAVORITE);

const initialState = List([
    Map({
        id: 'dkfjakd',
        title: 'test1', 
        thumbnail: null,
        favorite: true,
    }),
    Map({
        id: 'dkfjakd2',
        title: 'test2',
        thumbnail: null,
        favorite: false,
    })
])

export default handleActions({
    [GET_BOARDS]: (state, action) => {
    },
    [TOGGLE_FAVORITE]: (state, action) => {
        const index = state.findIndex(board=> board.get('id') === action.payload);
        return state.update(index, board => board.set('favorite', !board.get('favorite')));
    }
}, initialState)
