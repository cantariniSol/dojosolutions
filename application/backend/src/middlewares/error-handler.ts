import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { logger } from "../config/logger.js";
import { AppError } from "../errors/app-error.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Datos inválidos",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  // Error de Mongoose: ObjectId con formato inválido
  if (err.name === "CastError") {
    res.status(400).json({ message: "Identificador inválido" });
    return;
  }

  logger.error({ err }, "Error no controlado");
  res.status(500).json({ message: "Error interno del servidor" });
}
