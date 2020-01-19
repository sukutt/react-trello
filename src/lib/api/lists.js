import axios from 'axios';

export const getLists = (boardId) => axios.get(`/api/boards/${boardId}/tdl`);
export const createNewList = ({boardId, title}) => axios.post('/api/tdl', { boardId, title});
export const createNewCard = ({boardId, listId, content}) => axios.post(`/api/tdl/${boardId}/${listId}`, {content});
// list: list 또는 card 목록
export const reorder = ({key, id, list}) => axios.patch(`/api/tdl/${key}/${id}`, {list});
export const updateList = ({id, ...rest}) => axios.patch(`/api/tdl/${id}`, rest);
export const deleteList = ({id}) => axios.delete(`/api/tdl/${id}`);
export const deleteCards = ({key, id, listId}) => axios.delete(`/api/tdl/${key}/${id}`, {listId});