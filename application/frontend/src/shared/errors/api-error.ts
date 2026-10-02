// Error tipado para respuestas HTTP fallidas (equivalente a errors/app-error.ts del backend)
export class ApiError extends Error {
  readonly statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}
