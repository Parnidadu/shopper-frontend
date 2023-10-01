import axios from 'axios';

const baseURL = 'http://localhost:5000/api'; // Set your API base URL here
const token = localStorage.getItem('token'); // Get token from localStorage (assuming you store the token there after login)

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default api;
