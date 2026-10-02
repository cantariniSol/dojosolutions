import type { Task, TaskStatus } from '../types/task.types'

import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  isUpdating?: boolean
  isDeleting?: boolean
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  isUpdating,
  isDeleting,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
        No se encontraron tareas con los filtros aplicados.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </ul>
  )
}
