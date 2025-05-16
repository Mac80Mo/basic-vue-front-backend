// src/services/api.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

const apiConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    }
}

const api: AxiosInstance = axios.create(apiConfig)

// Token automatisch anfragen anhängen
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default api

