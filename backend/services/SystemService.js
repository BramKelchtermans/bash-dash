import si from 'systeminformation';
import HardwareComponent from '../models/HardwareComponent';
import HardwareLog from '../models/HardwareLog';
import { Op } from 'sequelize';
import moment from 'moment';
import speedtest from 'speedtest-net'

const _parseCpuLoads = (loads) => {
    const result = {
        'cpu_load': loads['currentLoad'],
        'user_load': loads['currentLoadUser'],
        'system_load': loads['currentLoadSystem'],
        'background_load': loads['currentLoadNice'],
        'idle_load': loads['currentLoadIdle'],
    }

    if (loads['cpus']) {
        const cores = [];
        for (let core of loads['cpus']) {
            cores.push({
                'core_load': core['load'],
                'user_load': core['loadUser'],
                'system_load': core['loadSystem'],
                'background_load': core['loadNice'],
                'idle_load': core['loadIdle']
            })
        }
        result['cores'] = cores;
    }

    return result;
};

const removeProps = (obj, props, inverse = false) => {
    const result = {};
    for (let key in obj) {
        if (inverse && props.includes(key)) {
            result[key] = obj[key];
        }
        if (!inverse && !props.includes(key)) {
            result[key] = obj[key];
        }
    }

    return result;
}

export const QUERY_MODE = {
    ALL: 'ALL',
    STATIC: 'STATIC',
    VARIABLE: 'VARIABLE'
}

const SystemService = {
    getComponentLogs: async (id, logStart = undefined, logEnd = undefined) => {
        logStart = logStart ? moment(logStart).toISOString() : moment().subtract('1', 'minute').toISOString();
        logEnd = logEnd ? moment(logEnd).toISOString() : moment().toISOString();

        const where = {
            component_id: id,
            createdAt: {
                [Op.gte]: logStart,
                [Op.lte]: logEnd
            }
        };

        const result = await HardwareLog.findAll({
            where: where
        });

        return result;

    },
    /**
    * Query a component in the database by type, includes hardware logs
    * 
    * @param {string} type 
    * @returns 
    */
    getComponentsById: async (id) => {
        const result = await HardwareComponent.findAll({
            where: {
                id: id
            }
        })

        if (result.length == 1) {
            return result[0];
        }

        return result;
    },
    /**
     * Query a component in the database by type, includes hardware logs
     * 
     * @param {string} type 
     * @returns 
     */
    getComponentsByType: async (type) => {
        const result = await HardwareComponent.findAll({
            where: {
                type: type
            }
        })

        if (result.length == 1) {
            return result[0];
        }

        return result;
    },



    /**
     * Get the live info about the cpu, memory, disks and network of the system
     * from the SystemInformation API
     * 
     * @param {QUERY_MODE} mode 
     * 
     * @returns The information of the current system
     */
    getLiveSystemInfo: async (mode) => {
        try {
            const result = {
                'cpu': await SystemService.getLiveCPUInfo(mode),
                'memory': await SystemService.getLiveMemoryInfo(mode),
                'disks': await SystemService.getLiveDisksInfo(mode),
                'network': await SystemService.getLiveNetworkInfo(mode)
            }
            return result;
        } catch (e) {
            console.log(e);
        }
    },
    getLiveDisksInfo: async (mode) => {
        const disks = await si.fsSize();

        const result = [];
        for (let disk of disks) {
            let obj = Object.assign({}, disk);
            delete obj['rw'];

            obj['disk_name'] = obj['fs'];
            delete obj['fs'];

            obj['use_pct'] = obj['use'];
            delete obj['use'];

            if (mode != QUERY_MODE.ALL) {
                obj = removeProps(obj, ['used', 'available', 'use_pct'], mode == QUERY_MODE.VARIABLE);
            }

            result.push(obj);
        }

        return result;
    },

    /**
     * Get system information about RAM memory
     * from the SystemInformation API
     * 
     * @returns object
     */
    getLiveMemoryInfo: async (mode) => {
        const mem = await si.mem();

        let result = {
            'total': mem['total'],
            'used': mem['active'],
            'free': mem['free']
        }

        if (mode != QUERY_MODE.ALL) {
            result = removeProps(result, ['used', 'free'], mode == QUERY_MODE.VARIABLE)
        }

        return result;
    },

    /**
     * Get the current CPU info
     * from the SystemInformation API
     * 
     * @returns object the information
     */
    getLiveCPUInfo: async (mode) => {
        const cpu = await si.cpu();
        const temps = await si.cpuTemperature();
        const loads = await si.currentLoad();

        let result = {
            "vendor": cpu['vendor'],
            "type": cpu['brand'],
            "cores": cpu['cores'],
            "physical_cores": cpu['physicalCores'],
            "load": _parseCpuLoads(loads),
            "temperatures": {
                'cpu': temps['main'],
                'cores': temps['cores'],
                'max': temps['max']
            }
        }

        if (mode != QUERY_MODE.ALL) {
            result = removeProps(result, ['load', 'temperatures'], mode == QUERY_MODE.VARIABLE)
        }

        return result;
    },


    /**
     * Get the current network information of the system 
     * from the SystemInformation API
     * @returns 
     */
    getLiveNetworkInfo: async (mode) => {
        const nw = await si.networkInterfaces();

        const result = [];
        for (let nic of nw) {
            if (nic['default']) {
                delete nic['duplex'];
                delete nic['operstate'];
                delete nic['virtual'];
                delete nic['mtu'];
                delete nic['dnsSuffix'];
                delete nic['ieee8021xAuth'];
                delete nic['ieee8021xState'];
                delete nic['carrierChanges'];

                if (mode != QUERY_MODE.ALL) {
                    nic = removeProps(nic, ['ip4', 'ip4subnet', 'ip6', 'ip6subnet', 'speed', 'dhcp'], mode == QUERY_MODE.VARIABLE);
                }

                result.push(nic);
            }
        }

        return result;
    }
}
export default SystemService;