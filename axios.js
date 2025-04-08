import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // URL base do backend
});

export default instance;
