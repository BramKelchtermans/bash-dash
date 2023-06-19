import dotenv from "dotenv";
import { ExpressService, SequelizeService, SchedulerService } from "./api_services";
import { logger } from "./config/logger";
dotenv.config();

const services = [ExpressService, SequelizeService, SchedulerService];

(async () => {
  try {
    for (const service of services) {
      await service.init();
    }
    console.log("Server initialized.");
    //PUT ADITIONAL CODE HERE.
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();


const errorHandler = (error) => {
  logger.error(error);
}


process.on('uncaughtException', errorHandler)