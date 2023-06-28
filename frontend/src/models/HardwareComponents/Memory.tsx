import { FaMemory } from "react-icons/fa";
import SystemService from "services/SystemService";
import HardwareComponent from "./HardwareComponent";

class Memory extends HardwareComponent {
	protected total: any | undefined;

	constructor(
		id: number | undefined = undefined,
		name: string | undefined = undefined,
		type: string | undefined = undefined,
		static_attributes: any[] | undefined = undefined
	) {
		super(id, name, type, static_attributes);
	}

	public icon(): JSX.Element {
		return (<FaMemory className="w-5 h-5" />)
	}

	public async line(): Promise<any[]> {
		const logs = await SystemService.getDeviceLogs(this.id);
		if (!logs) return [];

		const data: any[] = [];
		for (let log of logs) {
			data.push({
				x: new Date(log.createdAt).getTime(),
				y: Math.round(log.data.used / this.$total * 100)
			})
		}
		return data;
	}

	public async nextLinePoint(after: Date): Promise<{ x: number, y: number }> {
		const logs = await SystemService.getDeviceLogs(this.id, after);
		if (!logs || logs.length === 0) return;

		const lastLog = logs.sort((a: any, b: any) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		})[0];

		return {
			x: lastLog.createdAt,
			y: Math.round(lastLog.data.used / this.$total * 100),
		}
	}

	public unit(): string {
		return '%';
	}

	public get $total(): number | undefined { return this.static_attributes.total; }

	private static bytesToGigabytes(bytes: number) {
		return bytes / 1024 / 1024 / 1024;
	}

	// Get pie data
	public async pieData(): Promise<any[]> {
		throw new Error("Not implemented");
	}
}

export default Memory;