import {handleActions, createAction} from 'redux-actions';
import {Map, List} from 'immutable';

const initialState = Map({
    list: List([{
        id: 0,
        title: 'test',
        cards: List([{
            id: 0,
            content: "It's a test",
        }, {
            id: 1,
            content: 'sldkjflkjdflkasjd',
        }])
    }, {
        id: 1,
        title: 'test2',
        cards: List([{
            id: 0,
            content: "It's a test",
        }, {
            id: 1,
            content: 'sldkjflkjdflkasjd',
        }])
    }])
})

export default handleActions({

}, initialState)