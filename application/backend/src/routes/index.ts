import { Router } from "express";

import { taskRouter } from "./task.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

apiRouter.use("/tasks", taskRouter);
