import { api } from '@/shared/lib/axios'

import type { CreateTaskDto, Task, UpdateTaskDto } from '../types/task.types'

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks')
    return data
  },

  getById: async (id: string): Promise<Task> => {
    const { data } = await api.get<Task>(`/tasks/${id}`)
    return data
  },

  create: async (dto: CreateTaskDto): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', dto)
    return data
  },

  update: async (id: string, dto: UpdateTaskDto): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${id}`, dto)
    return data
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },
}
