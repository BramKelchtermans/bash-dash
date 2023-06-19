import { Op } from "sequelize";
import SystemInfo from "../models/SystemInfo";
import SystemService from "../services/SystemService";
import { Job } from "./job";
import moment from 'moment';

const addNewInfo = async () => {
    const raw = await SystemService.getSystemInfo();
    if (!raw) {
        return;
    }

    const entry = SystemInfo.build(raw)
    await entry.save();
}

const deleteOldInfo = async () => {
    const date = moment().subtract(1, 'week').toDate();
    await SystemInfo.destroy({
        where: {
            createdAt: {
                [Op.lte]: date
            }
        }
    });
}


class UpdateSystemInfo extends Job {
    async fire() {
        try {
            await addNewInfo();
            await deleteOldInfo();
        } catch (e) {
            console.log(e)
        }
    }
}
export default UpdateSystemInfo;