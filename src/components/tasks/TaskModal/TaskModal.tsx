import { Modal } from 'antd'
import { ReactNode } from 'react'

interface Props {
  title: string
  isOpen: boolean
  handleCancel?: () => void
  body: ReactNode
}

export default function TaskModal({
  title,
  isOpen,
  handleCancel,
  body,
}: Props) {
  return (
    <Modal title={title} open={isOpen} onCancel={handleCancel} footer={null}>
      {body}
    </Modal>
  )
}
