import axios from 'axios';
import baseUrl from '../config/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default class RestService {
  constructor() {
    this.httpClient = axiosInstance;
  }
}
