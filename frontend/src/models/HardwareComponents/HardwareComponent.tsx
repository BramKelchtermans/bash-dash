abstract class HardwareComponent {
	protected id: number | undefined;
	protected name: string | undefined;
	protected type: string | undefined;
	protected static_attributes: any | undefined;

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



	public get $name(): string | undefined { return this.name; }
	public set $name(value: string | undefined) { this.name = value; }

	public get $type(): string | undefined { return this.type; }
	public set $type(value: string | undefined) { this.type = value; }

	public get $static_attributes(): any[] | undefined { return this.static_attributes; }
	public set $static_attributes(value: any[] | undefined) { this.static_attributes = value; }

	// Icon tho show in the component
	public icon(): JSX.Element {
		throw new Error("not implemented");
	}

	// Make a minimum line for the line graph component 
	public async line(): Promise<any[]> {
		throw new Error("Not implemented");
	}

	// Fetch the next x,y coordinates for the line graph 
	public async nextLinePoint(after: Date): Promise<{ x: number, y: number }> {
		throw new Error("Not implemented");
	}

	// The unit of the hardware component (eg. %)
	public unit(): string {
		throw new Error("Not implemented");
	}


	// Get pie data
	public async pieData(): Promise<any[]> {
		throw new Error("Not implemented");
	}
}

export default HardwareComponent;