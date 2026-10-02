// Centraliza el acceso a variables de entorno del cliente (equivalente a config/env.ts del backend)
export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
}
