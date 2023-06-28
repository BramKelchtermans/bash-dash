import HardwareComponent from "models/HardwareComponents/HardwareComponent";
import ApiService from "./ApiService"
import CPU from "models/HardwareComponents/CPU";
import Memory from "models/HardwareComponents/Memory";
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
	let result = HardwareComponent.fromJSON(json);
	if (json.type == 'CPU')
		return cast(result, CPU);
	else if (json.type == 'MEMORY')
		return cast(result, Memory);
	return result;
}

const SystemService = {
	getSystemHardware: async () => {
		const resp: any = await ApiService.get('system');
		const result = [];
		for (let key in resp) {
			const value = resp[key];
			if (Array.isArray(value)) {
				for (let comp of value) {
					result.push(parseComponent(comp));
				}
			} else {
				result.push(parseComponent(value));
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