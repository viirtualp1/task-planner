'use client'

import { useState } from 'react'
import { Card } from 'antd'
import { AuthForm } from '@/components/auth/AuthForm'
import styles from './AuthPage.module.scss'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => setIsLogin((prev) => !prev)

  return (
    <div className={styles.container}>
      <Card>
        <h1 className={styles.title}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </h1>

        <AuthForm isLogin={isLogin} toggleForm={toggleForm} />
      </Card>
    </div>
  )
}
