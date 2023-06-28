import Card from "components/card";
import { FC, useEffect, useMemo, useState } from "react"
import ReactApexChart from "react-apexcharts";
import LineOptions from "./ChartOptions/LineOptions";

interface Props {
	component: any;
	interval: number;
}
const HardwareLineGraphCard: FC<Props> = (props) => {
	var lastDate = new Date().getTime();
	var data: any[] = [];
	// var _series: any[] = props.component.line();
	var TICKINTERVAL = 1000
	let XAXISRANGE = 58000

	const [value, setValue] = useState(0)
	const [series, setSeries] = useState<any[]>()

	const [options, setOptions] = useState<any>(props.component ? LineOptions(props.component.id, XAXISRANGE, props.component.unit()) : {});

	async function getNewSeries(baseval: number) {
		var newDate = baseval + TICKINTERVAL;
		lastDate = newDate
		const point = await props.component.nextLinePoint(new Date(baseval));
		if (point) {
			for (var i = 0; i < data.length - 100; i++) {
				// IMPORTANT
				// we reset the x and y of the data which is out of drawing area
				// to prevent memory leaks
				data[i].x = newDate - XAXISRANGE - TICKINTERVAL
				data[i].y = 0
			}
			data.push(point);
			setValue(point.y)
		}

	}

	const init = async () => {
		const line = await props.component.line();
		data = line;
		setSeries([{ data: line }])
		ApexCharts.exec('line-chart-' + props.component.id, 'updateSeries', [{ title: 'Total Load', data: data }])
	}
	useEffect(() => {
		console.log(props.component)
		init();
		const interval = setInterval(() => {
			getNewSeries(lastDate)

			ApexCharts.exec('line-chart-' + props.component.id, 'updateSeries', [{ title: 'Total Load', data: data }])
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<>
			<Card extra="text-center line-graph-card" >
				<div className="!p-[20px]">

					<div className="graph-header">

						<div className="flex justify-between">
							<button
								className="graph-icon"
							>
								{props.component.icon()}
								<span>{props.component.$name}</span>

							</button>
						</div>
						<div className="text-left">
							<p className="text-3xl m-0 font-bold text-navy-700 dark:text-white">
								{value} {props.component.unit()}
							</p>
						</div>
					</div>
				</div>
				<div
					className="graph-chart-container"
				>
					{series &&
						<ReactApexChart
							height={'100%'}
							width={'100%'}
							options={options}
							series={series}
							type="area"
						/>
					}
				</div>

			</Card >
		</>
	)
}
export default HardwareLineGraphCard