import { FaMicrochip } from "react-icons/fa";
import HardwareComponent from "./HardwareComponent";
import SystemService from "services/SystemService";
import ColorUtils from "utils/ColorUtils";

class CPU extends HardwareComponent {
    private cores: number | undefined;

    constructor(
        id: number | undefined = undefined,
        name: string | undefined = undefined,
        type: string | undefined = undefined,
        static_attributes: any | undefined = undefined
    ) {
        super(id, name, type, static_attributes);
        this.cores = static_attributes.cores;

    }

    public icon(): JSX.Element {
        return (<FaMicrochip className="w-5 h-5" />)
    }

    public async line(): Promise<any[]> {
        const logs = await SystemService.getDeviceLogs(this.id);
        if (!logs) return [];

        const data: any[] = [];

        let lastDate = 0;
        const now = new Date().getTime();
        for (let log of logs) {
            data.push({
                x: new Date(log.createdAt).getTime(),
                y: Math.round(log.data.load.cpu_load)
            })
            lastDate += 1000;
        }

        return data;
    }

    public unit(): string {
        return '%'
    }

    public async nextLinePoint(after: Date | undefined = undefined): Promise<{ x: number; y: number; }> {
        const logs = await SystemService.getDeviceLogs(this.id, after);
        if (!logs || logs.length === 0) return;

        const lastLog = logs.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })[0];

        return {
            x: lastLog.createdAt,
            y: Math.round(lastLog.data.load.cpu_load),
        }
    }

    public get $cores(): number | undefined { return this.cores; }
    public set $cores(value: number | undefined) { this.cores = value; }
}
export default CPU;