import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

const SET_SIGNEDIN_INFO = 'user/SET_SIGNEDIN_INFO';
const LOGOUT = 'user/LOGOUT';
const CHECK_STATUS = 'user/CHECK_STATUS';

export const setSignedInInfo = createAction(SET_SIGNEDIN_INFO);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);

const initialState = {
    signedInInfo: Map({ // 현재 로그인중인 유저의 정보
        userId: null
    }),
    signedIn: false, // 현재 로그인중인지 알려준다
    validated: false // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
}

export default handleActions({
    [SET_SIGNEDIN_INFO]: (state, action) => state.set('signedInInfo', Map(action.payload)).set('signedIn', true),

    ...pender({
        type: CHECK_STATUS,
        onSuccess() {

        }
    })
}, initialState)