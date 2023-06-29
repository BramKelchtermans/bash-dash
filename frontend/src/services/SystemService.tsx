import HardwareComponent from "models/HardwareComponents/HardwareComponent";
import ApiService from "./ApiService"
import CPU from "models/HardwareComponents/Cpu";
import Memory from "models/HardwareComponents/Memory";
import Disk from "models/HardwareComponents/Disk";
import Nic from "models/HardwareComponents/Nic";

const types: { [key: string]: any } = {
	'CPU': CPU,
	'MEMORY': Memory,
	'DISK': Disk,
	'NIC': Nic
}

const parseHardwareStaticInfo = (info: any) => {
	const data: any = {}
	for (let key in info) {
		if (key == 'HardwareLogs') {
			data['logs'] = info[key];
		} else if (key != 'static_attributes') {
			data[key] = info[key];
		}
	}
	for (let key in info['static_attributes']) {
		data[key] = info['static_attributes'][key];
	}
	return data
}

function cast<T>(obj: any, cl: { new(...args: []): T }): T {
	obj.__proto__ = cl.prototype;
	return obj;
}
const parseComponent = (json: any) => {
	const type: string = json.type;
	if (!type || !Object.keys(types).includes(type)) return;
	return new types[type](json.id, json.name, json.type, json.static_attributes);
}

const SystemService = {
	getSystemHardware: async () => {
		const resp: any = await ApiService.get('system');
		const result = [];
		for (let key in resp) {
			const value = resp[key];
			if (Array.isArray(value)) {
				for (let raw of value) {
					const comp = parseComponent(raw);
					if (comp)
						result.push(comp);
				}
			} else {
				const comp = parseComponent(value);
				if (comp)
						result.push(comp);
			}
		}
		return result;
	},
	getDeviceLogs: async (deviceId: number, start: Date | undefined = undefined, end: Date | undefined = undefined) => {
		const resp: any = await ApiService.get('system/' + deviceId + '/logs', {
			params: {
				start: start,
				end: end
			}
		});
		return resp;
	},
	getCPUInfo: async (start: string | undefined = undefined, end: string | undefined = undefined) => {
		let url = 'system/cpu';
		if (start !== undefined) {
			url += '?start=' + start;
		}

		if (end !== undefined) {
			url += '&end=' + end;
		}

		const result: any = await ApiService.get(url);
		return parseHardwareStaticInfo(result);
	}
}
export default SystemService;