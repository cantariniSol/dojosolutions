import { z } from "zod";

import { TaskPriority, TaskStatus } from "../models/task.model.js";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const taskIdSchema = z.object({
  id: z.string().regex(objectIdRegex, "Identificador de tarea inválido"),
});

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(120, "El título no puede superar los 120 caracteres"),
  description: z
    .string()
    .max(500, "La descripción no puede superar los 500 caracteres")
    .optional(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
});

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, "El título es obligatorio")
      .max(120, "El título no puede superar los 120 caracteres")
      .optional(),
    description: z
      .string()
      .max(500, "La descripción no puede superar los 500 caracteres")
      .optional(),
    status: z.enum(TaskStatus).optional(),
    priority: z.enum(TaskPriority).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
