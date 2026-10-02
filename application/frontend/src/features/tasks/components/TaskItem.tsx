import type { Task, TaskPriority, TaskStatus } from '../types/task.types'
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from '../types/task.types'

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  isUpdating?: boolean
  isDeleting?: boolean
}

const STATUS_BADGE_STYLES: Record<TaskStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
}

const PRIORITY_BADGE_STYLES: Record<TaskPriority, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-orange-100 text-orange-700',
  high: 'bg-red-100 text-red-700',
}

export function TaskItem({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  isUpdating = false,
  isDeleting = false,
}: TaskItemProps) {
  return (
    <li className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header: título, badges y acciones */}
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <h3 className="truncate font-medium text-gray-900">{task.title}</h3>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE_STYLES[task.status]}`}
          >
            {TASK_STATUS_LABELS[task.status]}
          </span>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_BADGE_STYLES[task.priority]}`}
          >
            {TASK_PRIORITY_LABELS[task.priority]}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <select
            value={task.status}
            onChange={(event) =>
              onStatusChange(task.id, event.target.value as TaskStatus)
            }
            disabled={isUpdating}
            aria-label={`Cambiar estado de ${task.title}`}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            disabled={isDeleting}
            className="rounded-md border border-red-300 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Descripción a todo el ancho */}
      {task.description && (
        <>
          <hr className="border-gray-200" />
          <p className="p-4 pt-3 text-sm text-gray-600">{task.description}</p>
        </>
      )}
    </li>
  )
}
