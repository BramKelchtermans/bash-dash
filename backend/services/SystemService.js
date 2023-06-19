import si from 'systeminformation';

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

const SystemService = {
    /**
     * Get info about the cpu, memory, disks and network of the system
     * 
     * @returns The information of the current system
     */
    getSystemInfo: async () => {
        try {
            const result = {
                'cpu': await SystemService.getCPUInfo(),
                'memory': await SystemService.getMemoryInfo(),
                'disks': await SystemService.getDisksInfo(),
                'network': await SystemService.getNetworkInfo()
            }
            return result;
        } catch (e) {
            console.log(e);
        }
    },
    getDisksInfo: async () => {
        const disks = await si.fsSize();

        const result = [];
        for (let disk of disks) {
            let obj = Object.assign({}, disk);
            delete obj['rw'];

            obj['disk_name'] = obj['fs'];
            delete obj['fs'];

            obj['use_pct'] = obj['use'];
            delete obj['use'];

            result.push(obj);
        }

        return result;
    },

    /**
     * Get system information about RAM memory
     * 
     * @returns object
     */
    getMemoryInfo: async () => {
        const mem = await si.mem();

        const result = {
            'total': mem['total'],
            'used': mem['active'],
            'free': mem['free']
        }

        return result;
    },

    /**
     * Get the current CPU info
     * 
     * @returns object the information
     */
    getCPUInfo: async () => {
        const cpu = await si.cpu();
        const temps = await si.cpuTemperature();
        const loads = await si.currentLoad();

        const result = {
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
        return result;
    },



    getNetworkInfo: async () => {
        const nw = await si.networkInterfaces();

        const result = [];
        for (let nic of nw) {
            if (nic['speed']) {
                delete nic['duplex'];
                delete nic['operstate'];
                delete nic['virtual'];
                delete nic['mtu'];
                delete nic['dnsSuffix'];
                delete nic['ieee8021xAuth'];
                delete nic['ieee8021xState'];
                delete nic['carrierChanges'];

                result.push(nic);
            }
        }

        return result;
    }
}
export default SystemService;