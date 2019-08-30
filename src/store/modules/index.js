import { combineReducers } from 'redux';
import lists from './Lists';
import addButton from './AddButton';

export default combineReducers({
    lists,
    addButton,
});
