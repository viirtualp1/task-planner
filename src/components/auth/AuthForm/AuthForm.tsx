'use client'

import { Button, Flex, Form, Input } from 'antd'
import { MailOutlined, KeyOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { AuthPayload } from '@/types/auth'
import { get } from '@/utils/vplodash'
import { login, register } from '@/services/auth.api'

interface Props {
  toggleForm: () => void
  isLogin: boolean
}

export default function AuthForm({ isLogin, toggleForm }: Props) {
  const { setUser } = useAuthStore()
  const router = useRouter()
  const [form] = Form.useForm()

  const submit = async (data: AuthPayload) => {
    try {
      const { accessToken } = isLogin ? await login(data) : await register(data)
      setUser(accessToken)
      router.push('/tasks')
    } catch (error) {
      console.error(error)
      const errorMessage = get(error, 'response.data.message', 'Login failed')
      alert(errorMessage)
    }
  }

  return (
    <Form form={form} onFinish={submit} style={{ minWidth: 400 }}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Введите E-mail' }]}
      >
        <Input
          prefix={<MailOutlined />}
          size="large"
          type="email"
          placeholder="E-mail"
          required
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password
          prefix={<KeyOutlined />}
          size="large"
          type="password"
          placeholder="Пароль"
          required
        />
      </Form.Item>

      <Flex gap="middle">
        <Button type="primary" size="large" htmlType="submit">
          Далее
        </Button>
        <Button
          type="default"
          size="large"
          htmlType="button"
          onClick={toggleForm}
        >
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </Flex>
    </Form>
  )
}
