'use client'

import { useForm } from 'react-hook-form'
import api from '@/services/axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { AuthPayload } from '@/types/auth'
import { get } from '@/utils/vplodash'

import styles from './LoginForm.module.scss'

export default function LoginForm() {
  const { register, handleSubmit } = useForm<AuthPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { login } = useAuthStore()
  const router = useRouter()

  const onSubmit = async (data: AuthPayload) => {
    try {
      const response = await api.post('/auth/login', data)
      const { accessToken } = response.data
      login(accessToken)
      localStorage.setItem('token', accessToken) // Сохраняем токен
      router.push('/tasks') // Переходим к списку задач
    } catch (error) {
      console.error(error)
      const errorMessage = get(error, 'response.data.message', 'Login failed')
      alert(errorMessage)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        {...register('email')}
        required
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        {...register('password')}
        required
      />
      <button className={styles.button} type="submit">
        Login
      </button>
    </form>
  )
}
