import { useState } from 'react'

import type { Task } from '../types/task.types'
import { Pagination } from '../components/Pagination'
import { TaskFilters } from '../components/TaskFilters'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useTaskFilters } from '../hooks/useTaskFilters'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const {
    tasks,
    isLoading,
    isError,
    error,
    createTask,
    updateTask,
    deleteTask,
    isCreating,
    isUpdating,
    isDeleting,
  } = useTasks()

  const {
    search,
    statusFilter,
    priorityFilter,
    page,
    pageSize,
    totalPages,
    filteredTasks,
    paginatedTasks,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    setPageSize,
    setPage,
  } = useTaskFilters(tasks)

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const handleCreate = async (values: {
    title: string
    description?: string
    status: Task['status']
    priority: Task['priority']
  }) => {
    setActionError(null)
    try {
      await createTask(values)
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Error al crear la tarea',
      )
    }
  }

  const handleUpdate = async (values: {
    title: string
    description?: string
    status: Task['status']
    priority: Task['priority']
  }) => {
    if (!editingTask) return
    setActionError(null)
    try {
      await updateTask({ id: editingTask.id, dto: values })
      setEditingTask(null)
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Error al actualizar la tarea',
      )
    }
  }

  const handleDelete = async (id: string) => {
    setActionError(null)
    try {
      await deleteTask(id)
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Error al eliminar la tarea',
      )
    }
  }

  const handleStatusChange = async (
    id: string,
    status: Task['status'],
  ): Promise<void> => {
    setActionError(null)
    try {
      await updateTask({ id, dto: { status } })
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Error al cambiar el estado',
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de tareas</h1>
          <p className="text-sm text-gray-600">
            Creá, editá y seguí el estado de tus tareas.
          </p>
        </header>

        <hr className="border-gray-300" />

        {isError && (
          <div
            role="alert"
            className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700"
          >
            No se pudieron cargar las tareas:{' '}
            {error instanceof Error ? error.message : 'error desconocido'}
          </div>
        )}

        {actionError && (
          <div
            role="alert"
            className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700"
          >
            {actionError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Columna izquierda: formulario */}
          <section
            aria-label="Formulario de tareas"
            className="lg:sticky lg:top-6 lg:self-start"
          >
            <TaskForm
              key={editingTask?.id ?? 'new'}
              initialValues={editingTask ?? undefined}
              onSubmit={editingTask ? handleUpdate : handleCreate}
              onSuccess={editingTask ? () => setEditingTask(null) : undefined}
              onCancel={editingTask ? () => setEditingTask(null) : undefined}
              isSubmitting={isCreating || isUpdating}
            />
          </section>

          {/* Columna derecha: lista con filtros y paginación */}
          <section aria-label="Lista de tareas" className="flex flex-col gap-4">
            <TaskFilters
              search={search}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
              onPriorityFilterChange={setPriorityFilter}
              totalResults={filteredTasks.length}
            />

            {isLoading ? (
              <p className="text-sm text-gray-500">Cargando tareas...</p>
            ) : (
              <>
                <TaskList
                  tasks={paginatedTasks}
                  onEdit={setEditingTask}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  isUpdating={isUpdating}
                  isDeleting={isDeleting}
                />
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        Hecho con 💜 por <span className="font-medium">Sol Cantarini</span>
      </footer>
    </div>
  )
}
