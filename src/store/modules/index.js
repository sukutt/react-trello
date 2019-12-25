import { combineReducers } from 'redux';
import lists from './lists';
import actionbutton from './actionbutton';
import base from './base';
import auth from './auth';
import user from './user';
import boards from './boards';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    lists,
    actionbutton,
    base,
    auth,
    user,
    boards,
    pender: penderReducer
});
