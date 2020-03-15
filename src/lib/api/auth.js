import axios from 'axios';

export const signUp = ({ email, userId, password}) => axios.post('/api/auth/signup', { email, userId, password });
export const signIn = ({ email, password }) => axios.post('/api/auth/signin', { email, password });
export const signInWithOAuth = ({ email, userId }) => axios.post('/api/auth/signInWithOAuth', { email, userId });
export const logout = () => axios.post('/api/auth/logout');
export const checkStatus = () => axios.get('/api/auth/check');

export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
export const checkUserIdExists = (userId) => axios.get('/api/auth/exists/userid/' + userId);