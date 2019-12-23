import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';
import * as BoardsAPI from 'lib/api/boards';
import { pender } from 'redux-pender';

const GET_BOARDS = 'boards/GET_BOARDS';
const GET_BOARD_IMAGES = 'boards/GET_BOARD_IMAGES';
const CREATE = 'boards/CREATE';
const TOGGLE_FAVORITE = 'boards/TOGGLE_FAVORTIE';

export const getBoards = createAction(GET_BOARDS, BoardsAPI.getBoards);
export const getBoardImages = createAction(GET_BOARD_IMAGES, BoardsAPI.getBoardImages);
export const createBoard = createAction(CREATE, BoardsAPI.createBoard);
export const toggleFavorite = createAction(TOGGLE_FAVORITE, BoardsAPI.toggleFavorite);

const initialState = Map({
    list: List([]),
    images: List([]),
})

export default handleActions({
    ...pender({
        type: GET_BOARD_IMAGES,
        onSuccess: (state, action) => {
            const immutableList = action.payload.data.map((value) => {
                return Map(value);
            })

            return state.set('images', List(immutableList))
        }
    }),

    ...pender({
        type: GET_BOARDS,
        onSuccess: (state, action) => {
            const immutableList = action.payload.data.map((value) => {
                return Map(value);
            })

            return state.set('list', List(immutableList))
        }
    }),

    ...pender({
        type: CREATE,
        onSuccess: (state, action) => {
            const list = state.get('list');
            console.log(action.payload.data)
            return state.set('list', list.push(Map(action.payload.data)));
        }
    }),

    ...pender({
        type: TOGGLE_FAVORITE,
        onSuccess: (state, action) => {
            const index = state.get('list').findIndex(board=> board.get('_id') === action.payload.data);
            const newList = state.get('list').update(index, board => board.set('favorite', !board.get('favorite')));
            return state.set('list', newList);
        }
    })
}, initialState)
