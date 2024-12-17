import { AuthPayload } from '@/types/auth'
import api from '@/services/axios'

interface AuthResponse {
  accessToken: string
}

export function login(data: AuthPayload): Promise<AuthResponse> {
  return api.post('/auth/login', data).then((res) => res.data)
}

export function register(data: AuthPayload): Promise<AuthResponse> {
  return api.post('/auth/register', data).then((res) => res.data)
}
