import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const api_formdata = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});



export {api_formdata};

export default api