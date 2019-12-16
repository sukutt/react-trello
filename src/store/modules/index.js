import { combineReducers } from 'redux';
import lists from './Lists';
import actionButton from './ActionButton';
import base from './base';
import auth from './auth';
import user from './user';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    lists,
    actionButton,
    base,
    auth,
    user,
    pender: penderReducer
});
