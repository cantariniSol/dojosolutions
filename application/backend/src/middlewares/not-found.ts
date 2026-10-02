import type { Request, Response } from "express";

import { NotFoundError } from "../errors/app-error.js";

export function notFoundHandler(req: Request, res: Response): void {
  const error = new NotFoundError(`Ruta ${req.method} ${req.path}`);
  res.status(error.statusCode).json({ message: error.message });
}
