import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender/lib/utils';
import * as AuthAPI from 'lib/api/auth';

const SIGN_UP = 'auth/SIGN_UP';
const SIGN_IN = 'auth/SIGN_IN';
const SIGN_IN_WITH_OAUTH = 'auth/SIGN_IN_WITH_OAUTH';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'; // 이메일 중복 확인
const CHECK_USERID_EXISTS = 'auth/CHECK_USERID_EXISTS'; // 아이디 중복 확인

export const signUp = createAction(SIGN_UP, AuthAPI.signUp);
export const signIn = createAction(SIGN_IN, AuthAPI.signIn);
export const signInWithOAuth = createAction(SIGN_IN_WITH_OAUTH, AuthAPI.signInWithOAuth);
export const changeInput =  createAction(CHANGE_INPUT);
export const setError = createAction(SET_ERROR);
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists);
export const checkUserIdExists = createAction(CHECK_USERID_EXISTS, AuthAPI.checkUserIdExists);

const initialState = Map({
    signUp: Map({
        exists: Map({
            email: false,
            userId: false
        })
    }),
    result: Map({})
});

export default handleActions({
    ...pender({
        type: SIGN_UP,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: SIGN_IN,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: SIGN_IN_WITH_OAUTH,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: CHECK_EMAIL_EXISTS,
        onSuccess: (state, action) => state.setIn(['signUp', 'exists', 'email'], action.payload.data.exists)
    }),

    ...pender({
        type: CHECK_USERID_EXISTS,
        onSuccess: (state, action) => state.setIn(['signUp', 'exists', 'userId'], action.payload.data.exists)
    })
}, initialState)