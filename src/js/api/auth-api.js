import api from './axios-instance.js';

export const register = (payload) => api.post('/register', payload);
export const login = (payload) => api.post('/login', payload);
