import axios from 'axios'
import router from '@/router'

const baseUrl = import.meta.env.VITE_VDGO_BASE_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default apiClient