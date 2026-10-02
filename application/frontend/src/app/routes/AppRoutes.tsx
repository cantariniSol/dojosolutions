import { Navigate, Route, Routes } from 'react-router-dom'

import { TasksPage } from '@features/tasks/pages/TasksPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="*" element={<Navigate to="/tasks" replace />} />
    </Routes>
  )
}
