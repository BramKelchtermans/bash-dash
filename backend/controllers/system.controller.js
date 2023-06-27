import * as Yup from "yup";
import {
    BadRequestError,
    UnauthorizedError,
    ValidationError,
} from "../utils/ApiError";
import SystemService from "../services/SystemService";
import Controller from "./controller";
import moment from "moment";

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

    static async getDeviceLogs(req, res, next) {
        try {
            const result = await SystemService.getComponentLogs(req.params.componentId, req.query.start, req.query.end);
            super.successResponseData(res, result);
        } catch (e) {
            super.errorResponseMsg(res, e);
        }
    }

    static async getDeviceInfo(req, res, next) {
        try {
            const result = await SystemService.getComponentsById(req.params.componentId);
            return super.successResponseData(res, result);
        } catch (e) {
            console.log(e)
            return super.errorResponseMsg(res, e);
        }
    }




    static async getCurrentSystemInfo(req, res, next) {
        try {
            const result = {
                'CPU': await SystemService.getComponentsByType('CPU'),
                'MEMORY': await SystemService.getComponentsByType('MEMORY'),
                'DISKS': await SystemService.getComponentsByType('DISK'),
                'NIC': await SystemService.getComponentsByType('NIC'),
            }
            return super.successResponseData(res, result);
        } catch (e) {
            return super.errorResponseMsg(res, e);
        }
    };

    static async getCurrentCpuInfo(req, res, next) {
        try {
            const result = await SystemService.getComponentsByType('CPU', req.query.start, req.query.end);
            return super.successResponseData(res, result);
        } catch (e) {
            console.error(e)
            return super.errorResponseMsg(res, e);
        }
    };

    static async getCurrentMemoryInfo(req, res, next) {
        try {
            const result = await SystemService.getComponentsByType('MEMORY', req.query.start, req.query.end);
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