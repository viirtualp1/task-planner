'use client'

import { FC, useEffect, useState } from 'react'
import api from '@/services/axios'
import { TaskData, TaskPayload } from '@/types/tasks'
import { useRouter } from 'next/navigation'
import { Button, FloatButton, Form, Input, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { TaskModal } from '@/components/tasks/TaskModal'
import styles from './TasksPage.module.scss'
import { create } from '@/services/tasks.api'

const TaskModalBody: FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const submit = async (data: TaskPayload) => {
    await create(data)
    router.refresh()
  }

  return (
    <Form form={form} onFinish={submit} style={{ marginTop: 24 }}>
      <Form.Item name="title">
        <Input placeholder="Название задачи" />
      </Form.Item>
      <Form.Item name="description">
        <Input placeholder="Текст задачи" />
      </Form.Item>

      <Button type="primary" size="large" htmlType="submit">
        Создать
      </Button>
    </Form>
  )
}

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks')
        setTasks(response.data)
      } catch (error) {
        console.error('Failed to fetch tasks', error)
        const isUnauthorized = error.status === 401

        if (isUnauthorized) {
          router.push('/auth')
        }
      }
    }

    fetchTasks()
  }, [router])

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.container}>
        <List
          size="large"
          style={{ minWidth: 400, marginBottom: 24 }}
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item>
              <List.Item.Meta title={task.title} />
              {task.description}
            </List.Item>
          )}
        />

        {tasks.length === 0 && (
          <Button
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsOpen(true)}
          >
            Создать задачу
          </Button>
        )}
      </div>

      <TaskModal
        title="Создать задачу"
        isOpen={isOpen}
        handleCancel={closeModal}
        body={<TaskModalBody />}
      />
      {tasks.length > 0 && (
        <FloatButton icon={<PlusOutlined />} onClick={() => setIsOpen(true)} />
      )}
    </>
  )
}
