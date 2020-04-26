import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({
  path: './',
});

export const get = (endpoint) => axios.get(`${process.env.REACT_APP_API_URL}/${endpoint}`);

export const post = (endpoint, data = {}) => axios.post(`${process.env.REACT_APP_API_URL}/${endpoint}`, data);
