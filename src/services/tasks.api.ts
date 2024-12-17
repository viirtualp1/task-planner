import api from '@/services/axios'
import { TaskData, TaskPayload } from '@/types/tasks'

export function create(data: TaskPayload): Promise<TaskData> {
  return api.post('/tasks', data).then((res) => res.data)
}
