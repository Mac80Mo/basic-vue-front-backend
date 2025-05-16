// src/services/auth.ts
import api from './api'
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  ProfileResponse,
  ApiResponse
} from '../types'

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials)
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Login fehlgeschlagen')
  }
  return response.data.data
}

export async function register(userData: RegisterRequest): Promise<LoginResponse> {
  const response = await api.post<ApiResponse<LoginResponse>>('/auth/register', userData)
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Registrierung fehlgeschlagen')
  }
  return response.data.data
}

export async function getProfile(): Promise<ProfileResponse> {
  const response = await api.get<ApiResponse<ProfileResponse>>('/user/profile')
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || 'Profil konnte nicht geladen werden')
  }
  return response.data.data
}
