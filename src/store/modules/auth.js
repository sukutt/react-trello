import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender/lib/utils';
import * as AuthAPI from 'lib/api/auth';

const SIGN_UP = 'auth/SIGN_UP';
const SIGN_IN = 'auth/SIGN_IN';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';

export const signUp = createAction(SIGN_UP, AuthAPI.signUp);
export const signIn = createAction(SIGN_IN, AuthAPI.signIn);
export const changeInput =  createAction(CHANGE_INPUT);
export const setError = createAction(SET_ERROR);

const initialState = Map({
    register: Map({
        form: Map({
            email: '',
            userId: '',
            password: '',
            passwordConfirm: '',
        })
    }),
    signIn: Map({
        form: Map({
            email: '',
            password: '',
        })
    }),
    result: Map({})
});

export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value, form } = action.payload;
        return state.setIn([form, 'form', name], value);
    },

    ...pender({
        type: SIGN_UP,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: SIGN_IN,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    })
}, initialState)