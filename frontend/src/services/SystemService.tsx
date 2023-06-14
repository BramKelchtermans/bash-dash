import ApiService from "./ApiService"

const SystemService = {
    getCPUInfo: async () => {
        const result = await ApiService.get('system/disks');
        return result;
    }
}
export default SystemService;