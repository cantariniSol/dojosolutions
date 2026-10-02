import type { Request, Response } from "express";

import { asyncHandler } from "../utils/async-handler.js";
import { taskService } from "../services/task.service.js";
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from "../validations/task.validation.js";

export const taskController = {
  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = taskIdSchema.parse(req.params);
    const task = await taskService.getTaskById(id);
    res.json(task);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = createTaskSchema.parse(req.body);
    const task = await taskService.createTask(data);
    res.status(201).json(task);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = taskIdSchema.parse(req.params);
    const data = updateTaskSchema.parse(req.body);
    const task = await taskService.updateTask(id, data);
    res.json(task);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const { id } = taskIdSchema.parse(req.params);
    await taskService.deleteTask(id);
    res.status(204).send();
  }),
};
