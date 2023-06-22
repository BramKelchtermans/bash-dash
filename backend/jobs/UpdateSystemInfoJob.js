import { Op } from "sequelize";
import SystemService, { QUERY_MODE } from "../services/SystemService";
import { Job } from "./job";
import moment from 'moment';
import HardwareComponent from "../models/HardwareComponent";
import HardwareLog from "../models/HardwareLog";

const logStats = async (comp, data) => {
    await HardwareLog.create({
        'component_id': comp.id,
        'data': data
    });
}

const addNewInfo = async () => {
    const rawStats = await SystemService.getLiveSystemInfo(QUERY_MODE.VARIABLE);
    const comps = await HardwareComponent.findAll();

    let disksFound = 0;
    for (let comp of comps) {
        switch (comp.type) {
            case 'CPU':
                await logStats(comp, rawStats['cpu']);
                break;
            case 'MEMORY':
                await logStats(comp, rawStats['memory']);
                break;
            case 'DISK':
                await logStats(comp, rawStats['disks'][disksFound]);
                disksFound++;
                break;
            case 'NIC':
                await logStats(comp, rawStats['network']);
                break;
        }
    }
}

const deleteOldInfo = async () => {
    const date = moment().subtract(1, 'hour').toDate();
    await HardwareLog.destroy({
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
            // await deleteOldInfo();
        } catch (e) {
            console.log(e)
        }
    }
}
export default UpdateSystemInfo;