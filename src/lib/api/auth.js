import axios from 'axios';

export const signUp = ({ email, userId, password}) => axios.post('/api/auth/signup', { email, userId, password });
export const signIn = ({ email, password }) => axios.post('/api/auth/signin', { email, password });
export const logout = ( {} ) => axios.post('/api/auth/logout', {});
export const checkStatus = ({}) => axios.get('/api/auth/checkStatus', {});
