import axios from 'axios';

export const getBoards = (email) => axios.get('/api/boards/' + email);
export const getBoardImages = () => axios.get('/api/boards/images');
export const createBoard = ({ email, title, thumbnail }) => axios.post('/api/boards', { email, title, thumbnail });
export const toggleFavorite = ({ id, favorite }) => axios.patch('/api/boards', { id, favorite });
export const updateTitle = ({id, title}) => axios.patch('/api/boards', { id, title });