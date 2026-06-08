import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/api.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For Better Auth session cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error normalization
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // Normalize error response so it always matches the ApiResponse format
    let message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // If there are validation errors, provide the first one as the main message for better UX
    if (error.response?.data?.errors && error.response.data.errors.length > 0) {
      const firstError = error.response.data.errors[0];
      message = firstError.message || message;
    }

    const normalizedError: ApiResponse = {
      success: false,
      message,
      instructions: error.response?.data?.instructions,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(normalizedError);
  }
);
