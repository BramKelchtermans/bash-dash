import { Op, Sequelize } from "sequelize";
import HardwareComponent from "../models/HardwareComponent";
import SystemService, { HARDWARE_QUERY_MODE, QUERY_MODE } from "../services/SystemService";
import { Job } from "./job";
import HardwareLog from "../models/HardwareLog";
import databaseConfig from "../config/database";

const makeCpu = async (cpuData) => {
    const data = {
        name: `${cpuData['vendor']} ${cpuData['type']}`,
        type: 'CPU',
        static_attributes: cpuData
    }
    await HardwareComponent.upsert(data);
}

const makeMemory = async (memData) => {
    const data = {
        name: 'Memory',
        type: 'MEMORY',
        static_attributes: memData
    }
    await HardwareComponent.upsert(data);
}

const makeNetwork = async (nicData) => {
    for (let nic of nicData) {
        const data = {
            name: nic['ifaceName'],
            type: 'NIC',
            static_attributes: nic
        };
        await HardwareComponent.upsert(data);
    }
}

const makeDisks = async (diskData) => {
    for (let disk of diskData) {
        const data = {
            name: disk['disk_name'],
            type: 'DISK',
            static_attributes: disk
        }
        await HardwareComponent.upsert(data);
    }
}

const handle = async () => {
    const raw = await SystemService.getLiveSystemInfo(QUERY_MODE.STATIC);
    if (raw['cpu']) {
        await makeCpu(raw['cpu']);
    }
    if (raw['memory']) {
        await makeMemory(raw['memory'])
    }
    if (raw['disks']) {
        await makeDisks(raw['disks'])
    }
    if (raw['network']) {
        await makeNetwork(raw['network']);
    }
}

class InitializeHardware extends Job {
    async fire() {
        try {
            await HardwareLog.destroy({ truncate: true, restartIdentity: true });
            const conn = new Sequelize(databaseConfig);
            await conn.query("UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'HardwareLogs';");
            await handle();
        } catch (e) {
            console.log(e)
        }
    }
}
export default InitializeHardware; 