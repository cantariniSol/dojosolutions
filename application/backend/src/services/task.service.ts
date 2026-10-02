import { NotFoundError } from "../errors/app-error.js";
import type { TaskDocument } from "../models/task.model.js";
import { taskRepository } from "../repositories/task.repository.js";
import type { CreateTaskInput, UpdateTaskInput } from "../validations/task.validation.js";

export const taskService = {
  getAllTasks: (): Promise<TaskDocument[]> => {
    return taskRepository.findAll();
  },

  getTaskById: async (id: string): Promise<TaskDocument> => {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError("Tarea");
    }
    return task;
  },

  createTask: (data: CreateTaskInput): Promise<TaskDocument> => {
    return taskRepository.create(data);
  },

  updateTask: async (
    id: string,
    data: UpdateTaskInput,
  ): Promise<TaskDocument> => {
    const task = await taskRepository.update(id, data);
    if (!task) {
      throw new NotFoundError("Tarea");
    }
    return task;
  },

  deleteTask: async (id: string): Promise<void> => {
    const task = await taskRepository.remove(id);
    if (!task) {
      throw new NotFoundError("Tarea");
    }
  },
};
