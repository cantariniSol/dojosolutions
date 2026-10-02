import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { Task } from '../types/task.types'
import { taskFormSchema, type TaskFormValues } from '../validations/task.validation'

export function useTaskForm(initialValues?: Task) {
  return useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
      status: initialValues?.status ?? 'pending',
      priority: initialValues?.priority ?? 'medium',
    },
  })
}
