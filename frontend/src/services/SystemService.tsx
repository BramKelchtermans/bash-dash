import ApiService from "./ApiService"
const parseHardwareStaticInfo = (info: any) => {
    const data: any = {}
    for (let key in info) {
        if (key == 'HardwareLogs') {
            data['logs'] = info[key];
        } else if (key != 'static_attributes') {
            data[key] = info[key];
        }
    }
    for (let key in info['static_attributes']) {
        data[key] = info['static_attributes'][key];
    }
    return data
}
const SystemService = {
    getCPUInfo: async (start: string | undefined = undefined, end: string | undefined = undefined) => {
        let url = 'system/cpu';
        if (start !== undefined) {
            url += '?start=' + start;
        }

        if (end !== undefined) {
            url += '&end=' + end;
        }

        const result: any = await ApiService.get(url);
        return parseHardwareStaticInfo(result);
    }
}
export default SystemService;