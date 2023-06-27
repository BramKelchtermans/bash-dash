class HardwareComponent {
	private id: number | undefined;
	private name: string | undefined;
	private type: string | undefined;
	private static_attributes: any[] | undefined;

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

	public static fromJSON(json: any): HardwareComponent {
		let result = new HardwareComponent();
		Object.assign(result, json);
		return result;
	}

	public get $name(): string | undefined { return this.name; }
	public set $name(value: string | undefined) { this.name = value; }

	public get $type(): string | undefined { return this.type; }
	public set $type(value: string | undefined) { this.type = value; }

	public get $static_attributes(): any[] | undefined { return this.static_attributes; }
	public set $static_attributes(value: any[] | undefined) { this.static_attributes = value; }
}