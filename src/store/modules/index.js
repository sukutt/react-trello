import { combineReducers } from 'redux';
import lists from './lists';
import base from './base';
import auth from './auth';
import user from './user';
import boards from './boards';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    lists,
    base,
    auth,
    user,
    boards,
    pender: penderReducer
});
