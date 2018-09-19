import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BE_HOST,
})

export default instance;