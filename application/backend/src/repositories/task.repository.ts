import { TaskModel, type TaskDocument } from "../models/task.model.js";
import type { CreateTaskInput, UpdateTaskInput } from "../validations/task.validation.js";

export const taskRepository = {
  findAll: (): Promise<TaskDocument[]> => {
    return TaskModel.find().sort({ createdAt: -1 }).exec();
  },

  findById: (id: string): Promise<TaskDocument | null> => {
    return TaskModel.findById(id).exec();
  },

  create: (data: CreateTaskInput): Promise<TaskDocument> => {
    return TaskModel.create(data);
  },

  update: (id: string, data: UpdateTaskInput): Promise<TaskDocument | null> => {
    return TaskModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
  },

  remove: (id: string): Promise<TaskDocument | null> => {
    return TaskModel.findByIdAndDelete(id).exec();
  },
};
