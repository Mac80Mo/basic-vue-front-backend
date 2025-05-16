// src/types/index.ts
export {}

export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface ProfileResponse {
    username: string;
    email: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
  }
  
  export interface ApiError {
    message: string;
    status?: number;
  }

  