import { useMemo, useState } from 'react'

import type { Task, TaskPriority, TaskStatus } from '../types/task.types'

export const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25] as const

export type StatusFilter = TaskStatus | 'all'
export type PriorityFilter = TaskPriority | 'all'

export function useTaskFilters(tasks: Task[]) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch)
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, statusFilter, priorityFilter])

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize))
  const safePage = Math.min(page, totalPages)

  const paginatedTasks = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filteredTasks.slice(start, start + pageSize)
  }, [filteredTasks, safePage, pageSize])

  const updateSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const updateStatusFilter = (value: StatusFilter) => {
    setStatusFilter(value)
    setPage(1)
  }

  const updatePriorityFilter = (value: PriorityFilter) => {
    setPriorityFilter(value)
    setPage(1)
  }

  const updatePageSize = (value: number) => {
    setPageSize(value)
    setPage(1)
  }

  return {
    search,
    statusFilter,
    priorityFilter,
    page: safePage,
    pageSize,
    totalPages,
    filteredTasks,
    paginatedTasks,
    setSearch: updateSearch,
    setStatusFilter: updateStatusFilter,
    setPriorityFilter: updatePriorityFilter,
    setPageSize: updatePageSize,
    setPage,
  }
}
