import axios from 'axios';

export const getLists = (boardId) => axios.get(`/api/boards/${boardId}/tdl`);
export const createNewList = ({boardId, title}) => axios.post('/api/tdl', { boardId, title});
export const createNewCard = ({listId, content}) => axios.post(`/api/tdl/${listId}`, {content});
// list: list 또는 card 목록
export const reorder = ({key, id, list}) => axios.patch(`/api/tdl/${key}/${id}`, {list});