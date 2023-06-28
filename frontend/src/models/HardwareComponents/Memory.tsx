import { FaMemory } from "react-icons/fa";
import SystemService from "services/SystemService";

class Memory {
	protected id: number | undefined;
	protected name: string | undefined;
	protected type: string | undefined;
	protected static_attributes: any | undefined;
	protected total: any | undefined;

	constructor(
		id: number | undefined = undefined,
		name: string | undefined = undefined,
		type: string | undefined = undefined,
		static_attributes: any[] | undefined = undefined
	) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.static_attributes = static_attributes;
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

	public get $name(): string | undefined { return this.name; }
	public set $name(value: string | undefined) { this.name = value; }

	public get $type(): string | undefined { return this.type; }
	public set $type(value: string | undefined) { this.type = value; }

	public get $static_attributes(): any[] | undefined { return this.static_attributes; }
	public set $static_attributes(value: any[] | undefined) { this.static_attributes = value; }

	public get $total(): number | undefined { return this.static_attributes.total; }

	private static bytesToGigabytes(bytes: number) {
		return bytes / 1024 / 1024 / 1024;
	}
}

export default Memory;