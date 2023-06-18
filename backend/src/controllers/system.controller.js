import * as Yup from "yup";
import SystemInfo from "../models/SystemInfo";
import {
    BadRequestError,
    UnauthorizedError,
    ValidationError,
} from "../utils/ApiError";
import SystemService from "../services/SystemService";
import Controller from "./controller";

class SystemController extends Controller {
    async getInfo(req, res, next) {
        const result = await SystemService.getSystemInfo();
        return res.status(200).json(result);
    }

}
export default SystemController