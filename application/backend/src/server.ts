import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();
  app.listen(env.PORT, () => {
    logger.info(`🚀 Backend escuchando en http://localhost:${env.PORT}`);
    logger.info(`📋 Health check: http://localhost:${env.PORT}/api/health`);
  });
}

bootstrap().catch((error) => {
  logger.error({ err: error }, "Error fatal al iniciar el servidor");
  process.exit(1);
});
