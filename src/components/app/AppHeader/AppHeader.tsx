'use client'

import { Button } from 'antd'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import * as styles from './AppHeader.module.scss'

export default function AppHeader() {
  const { isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <h1>Task Manager</h1>

        {isAuthenticated ? (
          <Button onClick={handleLogout}>Выйти</Button>
        ) : (
          <Button onClick={() => router.push('/auth/login')}>Войти</Button>
        )}
      </nav>
    </header>
  )
}
