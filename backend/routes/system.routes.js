import { Router } from "express";
import SystemController from "../controllers/system.controller";

const systemRoutes = Router();

systemRoutes.get("/system", SystemController.getCurrentSystemInfo)
systemRoutes.get("/system/cpu", SystemController.getCurrentCpuInfo)
systemRoutes.get("/system/memory", SystemController.getCurrentMemoryInfo)
systemRoutes.get("/system/disks", SystemController.getCurrentDisksInfo)
systemRoutes.get("/system/network", SystemController.getCurrentNetworkinfo)
systemRoutes.get("/system/history", SystemController.getSystemInfoHistory)


systemRoutes.get("/system/:componentId", SystemController.getDeviceInfo)
systemRoutes.get("/system/:componentId/logs", SystemController.getDeviceLogs)

export { systemRoutes }