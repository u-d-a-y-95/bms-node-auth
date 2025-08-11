import { app } from "./app";
import { CONFIG } from "./config";
import { dataSource } from "./data-source";
import { logger } from "./lib/logger";

const startServer = async () => {
  try {
    await dataSource.initialize();
    app.listen(CONFIG.PORT, () => {
      logger.info(`${CONFIG.SERVICE_NAME} is running on ${CONFIG.PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

void startServer();
