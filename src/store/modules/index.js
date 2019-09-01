import { combineReducers } from 'redux';
import lists from './Lists';
import actionButton from './ActionButton';

export default combineReducers({
    lists,
    actionButton 
});
