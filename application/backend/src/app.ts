import { register } from "@prometheus-io/client";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { notFoundHandler } from "./middlewares/not-found.js";

export function createApp(): Express {
  const app = express();

  // Seguridad y middlewares base
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(pinoHttp({ logger }));

  // Métricas para Prometheus (Módulo 10)
  app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });

  // Rutas de la API
  app.use("/api", apiRouter);

  // 404 y manejo de errores (siempre al final)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
