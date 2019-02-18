import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8090/taxi',
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
})