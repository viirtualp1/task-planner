export interface TaskData {
  deadline: string | null
  description: string
  id: number
  status: string
  title: string
  userId: number
}

export interface TaskPayload {
  title: string
  description: string
}
