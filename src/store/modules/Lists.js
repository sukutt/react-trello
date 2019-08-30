import {handleActions, createAction} from 'redux-actions';
import {Map, List} from 'immutable';

const ADD_CARD = 'board/ADD_CARD';

export const addCard = createAction(ADD_CARD);

const initialState = Map({
    list: List([Map({
        id: 0,
        title: 'test',
        formOpen: false,
        cards: List([{
            id: 0,
            content: "It's a test",
        }, {
            id: 1,
            content: 'sldkjflkjdflkasjd',
        }])
    }), Map({
        id: 1,
        title: 'test2',
        formOpen: false,
        cards: List([{
            id: 0,
            content: "It's a test",
        }, {
            id: 1,
            content: 'sldkjflkjdflkasjd',
        }])
    })
]),
})

export default handleActions({
    [ADD_CARD]: (state, action) => {
        const list = state.get('list');
        return state.set('list', list.update(
            action.payload.id,
            (item) => item.set('formOpen', true)))
    },
}, initialState)