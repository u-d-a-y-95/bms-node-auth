import { app } from "./app";
import { CONFIG } from "./config";
import { logger } from "./logger";

const startServer = () => {
  try {
    app.listen(CONFIG.PORT, () => {
      logger.info(`${CONFIG.SERVICE_NAME} is running on ${CONFIG.PORT}`);
    });
  } catch (_error) {
    process.exit(1);
  }
};

startServer();
