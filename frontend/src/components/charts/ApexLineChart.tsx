import Card from "components/card";
import { FC, useEffect, useMemo, useState } from "react"
import ReactApexChart from "react-apexcharts";
import LineOptions from "./ChartOptions/LineOptions";

interface Props {
	component: any;
	interval: number;
}
const ApexLineChart: FC<Props> = (props) => {
	var lastDate = new Date().getTime();
	var data: any[] = [];
	// var _series: any[] = props.component.line();
	var TICKINTERVAL = 1000
	let XAXISRANGE = 58000

	const [value, setValue] = useState(0)
	const [series, setSeries] = useState<any[]>()

	const [options, setOptions] = useState<any>(LineOptions(props.component.id, XAXISRANGE, props.component.unit()));

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
		init();
		const interval = setInterval(() => {
			getNewSeries(lastDate)

			ApexCharts.exec('line-chart-' + props.component.id, 'updateSeries', [{ title: 'Total Load', data: data }])
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<>
			<Card extra="text-center" style={{ minHeight: '300px' }}>
				<div className="!p-[20px]">

					<div className="graph-header px-6">

						<div className="flex justify-between">
							<button
								className="graph-icon"
							// style={{
							//     backgroundColor: 'rgba(108, 187, 60, 0.15)',
							//     color: ' rgb(65, 163, 23)'
							// }}
							>
								{props.component.icon()}
								<span>{props.component.$name}</span>

							</button>
							{/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-success p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdBarChart className="h-6 w-6" />
                </button> */}
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
export default ApexLineChart