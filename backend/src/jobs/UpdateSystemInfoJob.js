import SystemInfo from "../models/SystemInfo";
import SystemService from "../services/SystemService";
import { Job } from "./job";


class UpdateSystemInfo extends Job {
    async fire() {
        const raw = await SystemService.getSystemInfo();
        try {
            const data = {};
            for (let key in raw) {
                data[key] = JSON.stringify(raw[key]);
            }
            const entry = SystemInfo.build(data)
            await entry.save();
        } catch (e) {
            console.log(e)
        }
    }
}
export default UpdateSystemInfo;