import { combineReducers } from 'redux';
import lists from './Lists';
import actionButton from './ActionButton';
import base from './base';

export default combineReducers({
    lists,
    actionButton,
    base,
});
