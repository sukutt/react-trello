import axios from 'axios';

export const getBoards = (email) => axios.get('/api/boards/' + email);
export const getBoardImages = () => axios.get('/api/boards/images');
export const createBoard = ({ email, title }) => axios.post('/api/boards', { email, title });
export const toggleFavorite = ({ id, favorite }) => axios.patch('/api/boards', { id, favorite });