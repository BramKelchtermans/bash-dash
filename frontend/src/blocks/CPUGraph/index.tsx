import React, { FC, useState, useContext, useEffect, useMemo, useRef } from 'react';
import Card from "components/card";
import SystemService from 'services/SystemService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaMicrochip } from 'react-icons/fa';
import { Col, Row } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import CPUChartOptions from './chartOptions';
import { Line } from 'react-chartjs-2';
import LineChart from 'components/charts/LineChart';
import { Chart as ChartJS } from 'chart.js'
import ColorUtils from 'utils/ColorUtils';

interface Props {
	updateInterval: number;
}
const CPUGraph: FC<Props> = (props) => {
	const [name, setName] = useState("");
	const [amountCores, setAmountCores] = useState(0);
	const [currentLoad, setCurrentLoad] = useState(0);

	const [chartOptions, setChartOptions] = useState<any>(CPUChartOptions);

	const lastFetchRef = useRef<Date | undefined>();

	const [dataSets, setDataSets] = useState<any[]>();

	const getCurrentLoad = (logs: any[]) => {
		const _currentLoad = logs.sort((a: any, b: any) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		})[0].data.load.cpu_load;
		setCurrentLoad(Math.round(_currentLoad));
	}

	const initSets = (info: any) => {
		const logs = info.logs;
		if (!logs) return {};

		const _dataSets = [];

		_dataSets.push({
			'name': 'Total Load',
			'color': 'var(--bs-link-color)',
			'data': [],
		})

		for (let i = 0; i < info.cores; i++) {
			_dataSets.push({
				'name': "Core " + (i + 1),
				'color': ColorUtils.randomColor(i),
				'data': [],
			})
		}

		setDataSets(_dataSets);
	}


	const init = async () => {
		lastFetchRef.current = new Date();
		const info = await SystemService.getCPUInfo();
		setName(info.name);
		setAmountCores(info.cores);

		if (info.logs && info.logs.length > 0) {
			getCurrentLoad(info.logs);
			initSets(info)
		}

	}

	const getPoint = async () => {
		const logs = (await SystemService.getCPUInfo(lastFetchRef.current.toISOString())).logs;

		if (!logs) return {
			x: 0,
			y: 0,
		};
		getCurrentLoad(logs);

		const lastLog = logs.sort((a: any, b: any) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		})[0];

		lastFetchRef.current = new Date(lastLog.createdAt);
		return {
			x: lastFetchRef.current.getTime(),
			y: lastLog.data.load.cpu_load,
		}
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<>


			{dataSets &&
				<LineChart
					interval={props.updateInterval}
					getPoint={getPoint}
					data={dataSets}
					icon={(<FaMicrochip className="w-5 h-5" />)}
					title={name}
					value={currentLoad + '%'}
				/>
			}

		</>
	);
}
export default CPUGraph;