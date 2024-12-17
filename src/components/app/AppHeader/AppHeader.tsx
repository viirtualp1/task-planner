'use client'

import { Button } from 'antd'
import { useAuthStore } from '@/store/authStore'
import { usePathname, useRouter } from 'next/navigation'
import * as styles from './AppHeader.module.scss'
import { useEffect, useState } from 'react'

export default function AppHeader() {
  const { isAuthenticated, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isShowButton, setIsShowButton] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/auth')
  }

  useEffect(() => {
    setIsShowButton(pathname !== '/auth')
  }, [pathname])

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <h1>Task Manager</h1>

        {isShowButton &&
          (isAuthenticated ? (
            <Button onClick={handleLogout}>Выйти</Button>
          ) : (
            <Button onClick={() => router.push('/auth/login')}>Войти</Button>
          ))}
      </nav>
    </header>
  )
}
