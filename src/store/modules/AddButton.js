import {handleActions, createAction} from 'redux-actions';
import {Map} from 'immutable';

const ADD_CARD = 'board/ADD_CARD';

export const addCard = createAction(ADD_CARD);

const initialState = Map({
    formOpen:false 
})

export default handleActions({
    [ADD_CARD]: (state, action) => {
        const formOpen= state.get('formOpen');
        return state.set('formOpen', !formOpen);
    },
}, initialState)