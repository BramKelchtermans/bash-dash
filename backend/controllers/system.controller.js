import * as Yup from "yup";
import {
    BadRequestError,
    UnauthorizedError,
    ValidationError,
} from "../utils/ApiError";
import SystemService from "../services/SystemService";
import Controller from "./controller";

class SystemController extends Controller {

    static async getSystemInfoHistory(req, res, next) {
        // try {
        //     let order = [['createdAt', 'DESC']];
        //     const options = super.paginateOptions(req, order);

        //     const { docs, pages, total } = await SystemInfo.paginate(options);
        //     return super.successResponseData(res, {
        //         data: docs,
        //         pages: pages,
        //         page: options.page,
        //         perPage: options.perPage,
        //         totalAmount: total
        //     });
        // } catch (e) {
        //     console.log(e)
        // }

    }




    static async getCurrentSystemInfo(req, res, next) {
        try {
            const result = await SystemService.getLiveSystemInfo();
            return super.successResponseData(res, result);
        } catch (e) {
            return super.errorResponseMsg(res, e.message);
        }
    };

    static async getCurrentCpuInfo(req, res, next) {
        try {
            const result = await SystemService.getComponentsByType('CPU');
            return super.successResponseData(res, result);
        } catch (e) {
            return super.errorResponseMsg(res, e.message);
        }
    };

    static async getCurrentMemoryInfo(req, res, next) {
        try {
            const result = await SystemService.getComponentsByType('MEMORY');
            return super.successResponseData(res, result);
        } catch (e) {
            super.errorResponseMsg(res, e.message);
        }
    }

    static async getCurrentDisksInfo(req, res, next) {
        try {
            const result = await SystemService.getLiveDisksInfo();
            return super.successResponseData(res, result);
        } catch (e) {
            super.errorResponseMsg(res, e.message);
        }
    }

    static async getCurrentNetworkinfo(req, res, next) {
        try {
            const result = await SystemService.getLiveNetworkInfo();
            return super.successResponseData(res, result);
        } catch (e) {
            super.errorResponseMsg(res, e.message);
        }
    }

}
export default SystemController;