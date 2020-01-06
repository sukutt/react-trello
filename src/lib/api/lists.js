import axios from 'axios';

export const getLists = (boardId) => axios.get(`/api/boards/${boardId}/lists`);
export const createNewList = ({boardId, title}) => axios.post('/api/lists', { boardId, title});
export const createNewCard = ({listId, content}) => axios.post(`/api/lists/${listId}`, { content});