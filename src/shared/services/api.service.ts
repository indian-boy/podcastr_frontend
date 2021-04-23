import axios from 'axios'

const apiService = axios.create({
  baseURL: 'http://localhost:3333/',
})

export default apiService
