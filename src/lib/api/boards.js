import axios from 'axios';

export const getBoards = (email) => axios.get('/api/boards/' + email);
export const createBoard = ({ email, title }) => axios.post('/api/boards', { email, title });
// export const signIn = ({ email, password }) => axios.post('/api/auth/signin', { email, password });
// export const logout = () => axios.post('/api/auth/logout');
// export const checkStatus = () => axios.get('/api/auth/check');