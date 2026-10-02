import { z } from 'zod'

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(30, 'El título no puede superar los 30 caracteres'),
  description: z
    .string()
    .max(300, 'La descripción no puede superar los 300 caracteres')
    .optional(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
