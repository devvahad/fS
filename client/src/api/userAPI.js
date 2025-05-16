// src/api/userAPI.js
import axios from '../utils/axiosInstance';

export const loginUser = async (email, password) => {
    const res = await axios.post('/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    return res.data;
};

export const registerUser = async (userData) => {
    const res = await axios.post('/', userData);
    return res.data;
};
