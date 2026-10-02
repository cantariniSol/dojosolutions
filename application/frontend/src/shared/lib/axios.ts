import axios from 'axios'

import { env } from '@shared/config/env'
import { ApiError } from '@shared/errors/api-error'

export const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        'Error de comunicación con el servidor'
      return Promise.reject(new ApiError(message, error.response?.status))
    }
    return Promise.reject(error)
  },
)
