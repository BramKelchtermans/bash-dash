const { systemService } = require("../services");
const { Job } = require("./job");
const SystemInformation = require("../database/models").SystemInformation;

class UpdateSystemInfo extends Job {
    async fire() {
        const raw = await systemService.getSystemInfo();
        try {
            const data = {};
            for (let key in raw) {
                data[key] = JSON.stringify(raw[key]);
            }
            const entry = SystemInformation.build(data)
            await entry.save();
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = {
    UpdateSystemInfo
}