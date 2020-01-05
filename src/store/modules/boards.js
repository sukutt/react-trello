import { handleActions, createAction } from 'redux-actions';
import { Map, List } from 'immutable';
import * as BoardsAPI from 'lib/api/boards';
import { pender } from 'redux-pender';

const GET_BOARDS = 'boards/GET_BOARDS';
const GET_BOARD_IMAGES = 'boards/GET_BOARD_IMAGES';
const CREATE = 'boards/CREATE';
const TOGGLE_FAVORITE = 'boards/TOGGLE_FAVORTIE';
const UPDATE_TITLE = 'boards/UPDATE_TITLE';

export const getBoards = createAction(GET_BOARDS, BoardsAPI.getBoards);
export const getBoardImages = createAction(GET_BOARD_IMAGES, BoardsAPI.getBoardImages);
export const createBoard = createAction(CREATE, BoardsAPI.createBoard);
export const toggleFavorite = createAction(TOGGLE_FAVORITE, BoardsAPI.toggleFavorite);
export const updateTitle = createAction(UPDATE_TITLE, BoardsAPI.updateTitle);

const initialState = Map({
    boards: List([]),
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

            return state.set('boards', List(immutableList))
        }
    }),

    ...pender({
        type: CREATE,
        onSuccess: (state, action) => {
            const list = state.get('boards');
            return state.set('boards', list.push(Map(action.payload.data)));
        }
    }),

    ...pender({
        type: TOGGLE_FAVORITE,
        onSuccess: (state, action) => {
            const { _id, favorite } = action.payload.data;
            const index = state.get('boards').findIndex(board=> board.get('_id') === _id);
            const newList = state.get('boards').update(index, board => board.set('favorite', favorite));
            return state.set('boards', newList);
        }
    }),

    ...pender({
        type: UPDATE_TITLE,
        onSuccess: (state, action) => {
            const { _id, title } = action.payload.data;
            const index = state.get('boards').findIndex(board=> board.get('_id') === _id);
            const newList = state.get('boards').update(index, board => board.set('title', title));
            return state.set('boards', newList);
        }
    }),
}, initialState)
