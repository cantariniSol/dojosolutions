import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { tasksApi } from '../api/tasks.api'
import type { CreateTaskDto, UpdateTaskDto } from '../types/task.types'

const TASKS_QUERY_KEY = ['tasks'] as const

export function useTasks() {
  const queryClient = useQueryClient()

  const tasksQuery = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: tasksApi.getAll,
  })

  const invalidateTasks = () =>
    queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })

  const createMutation = useMutation({
    mutationFn: (dto: CreateTaskDto) => tasksApi.create(dto),
    onSuccess: invalidateTasks,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      tasksApi.update(id, dto),
    onSuccess: invalidateTasks,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => tasksApi.remove(id),
    onSuccess: invalidateTasks,
  })

  return {
    tasks: tasksQuery.data ?? [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
