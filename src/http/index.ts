import axios from 'axios';

export const API_URL = `http://192.168.1.53:8080/api`

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL
})

export default $api