import { useForm } from 'react-hook-form'

import type { Task } from '../types/task.types'
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from '../types/task.types'
import { useTaskForm } from '../hooks/useTaskForm'
import type { TaskFormValues } from '../validations/task.validation'

interface TaskFormProps {
  initialValues?: Task
  onSubmit: (values: TaskFormValues) => Promise<void>
  onSuccess?: () => void
  onCancel?: () => void
  isSubmitting?: boolean
}

export function TaskForm({
  initialValues,
  onSubmit,
  onSuccess,
  onCancel,
  isSubmitting = false,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useTaskForm(initialValues) as ReturnType<typeof useForm<TaskFormValues>>

  const titleLength = watch('title')?.length ?? 0
  const descriptionLength = watch('description')?.length ?? 0

  const isEditing = Boolean(initialValues)

  const submit = handleSubmit(async (values) => {
    await onSubmit(values)
    if (!isEditing) {
      reset()
    }
    onSuccess?.()
  })

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <h2 className="text-lg font-semibold text-gray-900">
        {isEditing ? 'Editar tarea' : 'Nueva tarea'}
      </h2>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Título *
          </label>
          <span className="text-xs text-gray-400">{titleLength}/30</span>
        </div>
        <input
          id="title"
          type="text"
          maxLength={30}
          placeholder="Ej: Configurar el pipeline de CI"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register('title')}
        />
        {errors.title && (
          <p className="text-sm text-red-600" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <span className="text-xs text-gray-400">{descriptionLength}/300</span>
        </div>
        <textarea
          id="description"
          rows={3}
          maxLength={300}
          placeholder="Detalles opcionales de la tarea"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            id="status"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register('status')}
          >
            {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-sm font-medium text-gray-700">
            Prioridad
          </label>
          <select
            id="priority"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register('priority')}
          >
            {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? 'Guardando...'
            : isEditing
              ? 'Guardar cambios'
              : 'Crear tarea'}
        </button>
      </div>
    </form>
  )
}
