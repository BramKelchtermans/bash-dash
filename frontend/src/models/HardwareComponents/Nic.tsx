import HardwareComponent from "./HardwareComponent";

class Nic extends HardwareComponent {
    private default: boolean | undefined;
    private ifaceName: string | undefined;
    private internal: boolean | undefined;
    private mac: string | undefined;
    private nicType: string | undefined;

    constructor(...args: any[]) {
        super(...args);

        this.default = args[3].default;
        this.ifaceName = args[3].ifaceName;
        this.internal = args[3].internal;
        this.mac = args[3].mac;
        this.nicType = args[3].type;
    }

    public get $default(): boolean | undefined { return this.default; }
    public set $default(value: boolean | undefined) { this.default = value; }

    public get $ifaceName(): string | undefined { return this.ifaceName; }
    public set $ifaceName(value: string | undefined) { this.ifaceName = value; }

    public get $internal(): boolean | undefined { return this.internal; }
    public set $internal(value: boolean | undefined) { this.internal = value; }

    public get $mac(): string | undefined { return this.mac; }
    public set $mac(value: string | undefined) { this.mac = value; }

    public get $nicType(): string | undefined { return this.nicType; }
    public set $nicType(value: string | undefined) { this.nicType = value; }
}
export default Nic;