import axios from 'axios';

export default axios.create({
    baseURL: `https://localhost:5000/`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        accept: 'application/json'
    },
    withCredentials: false,
});
