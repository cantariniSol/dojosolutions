import { Router } from "express";

import { taskController } from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.get("/", taskController.getAll);
taskRouter.get("/:id", taskController.getById);
taskRouter.post("/", taskController.create);
taskRouter.put("/:id", taskController.update);
taskRouter.delete("/:id", taskController.remove);
