import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from '../types/task.types'
import type {
  PriorityFilter,
  StatusFilter,
} from '../hooks/useTaskFilters'

interface TaskFiltersProps {
  search: string
  statusFilter: StatusFilter
  priorityFilter: PriorityFilter
  onSearchChange: (value: string) => void
  onStatusFilterChange: (value: StatusFilter) => void
  onPriorityFilterChange: (value: PriorityFilter) => void
  totalResults: number
}

export function TaskFilters({
  search,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusFilterChange,
  onPriorityFilterChange,
  totalResults,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex-1 sm:min-w-52">
        <label htmlFor="task-search" className="sr-only">
          Buscar por título
        </label>
        <input
          id="task-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="🔍 Buscar por título..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="task-status-filter"
          className="text-sm font-medium text-gray-700"
        >
          Estado:
        </label>
        <select
          id="task-status-filter"
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as StatusFilter)
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Todos</option>
          {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="task-priority-filter"
          className="text-sm font-medium text-gray-700"
        >
          Prioridad:
        </label>
        <select
          id="task-priority-filter"
          value={priorityFilter}
          onChange={(event) =>
            onPriorityFilterChange(event.target.value as PriorityFilter)
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Todas</option>
          {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <span className="text-sm text-gray-500 sm:ml-auto">
        {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
      </span>
    </div>
  )
}
