import {default as axios} from 'axios';

export const API = axios.create({
    baseURL: 'http://94.241.173.222:8889',
});

export const API2 = axios.create({
    baseURL: 'http://94.241.173.222:8000'
});