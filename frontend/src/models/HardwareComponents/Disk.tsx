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

    // Get pie data
    public async pieData(): Promise<{
        value: number,
        label: string,
        color: string
    }[]> {
        const logs = await SystemService.getDeviceLogs(this.id);
        if (!logs) return [];

        const data = [];
        const lastLog = logs.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })[0];
        console.log(lastLog)
    }

    // Get pie labels
    public async pieLabels(): Promise<any[]> {
        throw new Error("Not implemented");
    }

}
export default Disk;