import mongoose from "mongoose";

import { env } from "./env.js";
import { logger } from "./logger.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("✅ Conectado a MongoDB");
  } catch (error) {
    logger.error({ err: error }, "❌ Error conectando a MongoDB");
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
