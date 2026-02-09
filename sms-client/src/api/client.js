import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE,
});

export const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export default client;