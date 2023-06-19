import { Op } from "sequelize";
import HardwareComponent from "../models/HardwareComponent";
import SystemService from "../services/SystemService";
import { Job } from "./job";


const makeCpu = async (cpuData) => {
    delete cpuData['load'];
    delete cpuData['temperatures'];

    const data = {
        name: `${cpuData['vendor']} ${cpuData['type']}`,
        type: 'CPU',
        static_attributes: cpuData
    }
    await HardwareComponent.upsert(data);
}

const makeMemory = async (memData) => {
    delete memData['used'];
    delete memData['free'];

    const data = {
        name: 'Memory',
        type: 'MEMORY',
        static_attributes: memData
    }
    await HardwareComponent.upsert(data);
}

const makeNetwork = async (nicData) => {
    for (let nic of nicData) {
        delete nic['ip4'];
        delete nic['ip4subnet'];
        delete nic['ip6'];
        delete nic['ip6subnet'];
        delete nic['speed'];
        delete nic['dhcp'];

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
        delete disk['used'];
        delete disk['available'];
        delete disk['use_pct'];

        const data = {
            name: disk['disk_name'],
            type: 'DISK',
            static_attributes: disk
        }
        await HardwareComponent.upsert(data);
    }
}

const handle = async () => {
    const raw = await SystemService.getSystemInfo();
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
            await handle();
        } catch (e) {
            console.log(e)
        }
    }
}
export default InitializeHardware; 