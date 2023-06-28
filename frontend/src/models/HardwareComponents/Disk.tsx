import SystemService from "services/SystemService";
import HardwareComponent from "./HardwareComponent";

class Disk extends HardwareComponent {
    constructor(
        id: number | undefined = undefined,
        name: string | undefined = undefined,
        type: string | undefined = undefined,
        static_attributes: any | undefined = undefined
    ) {
        super(id, name, type, static_attributes);
    }

    public get $size(): number { return this.static_attributes.size; }

    public unit() {
        return 'GB'
    }

    // Get pie data
    public async pieData(): Promise<{
        pct: number,
        value: number,
        label: string,
        color: string
    }[]> {
        const logs = await SystemService.getDeviceLogs(this.id);
        if (!logs) return [];

        const lastLog = logs.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })[0];

        return [{
            label: "Used space",
            color: "#4318ff",
            pct: lastLog.data.use_pct,
            value: lastLog.data.used / Math.pow(1024, 3)
        },
        {
            label: "Free space",
            value: lastLog.data.available / Math.pow(1024, 3),
            color: "#6ad2ff",
            pct: 100 - lastLog.data.use_pct
        }]
    }


}
export default Disk;