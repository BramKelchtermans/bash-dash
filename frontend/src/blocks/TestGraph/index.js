import React from "react";
import { Line, Chart } from "react-chartjs-2";
import StreamingPlugin from 'chartjs-plugin-streaming';
import {Chart as ChartJS} from 'chart.js'
import 'chartjs-adapter-moment';

ChartJS.register(StreamingPlugin)


const chartColors = {
	red: "rgb(255, 99, 132)",
	orange: "rgb(255, 159, 64)",
	yellow: "rgb(255, 205, 86)",
	green: "rgb(75, 192, 192)",
	blue: "rgb(54, 162, 235)",
	purple: "rgb(153, 102, 255)",
	grey: "rgb(201, 203, 207)"
};
const data = {
	datasets: [
		{
			label: 'Dataset 1 (Linear Interpolation)',
			borderDash: [8, 4],
			data: []
		},
		{
			label: 'Dataset 2 (Cubic Interpolation)',
			cubicInterpolationMode: 'monotone',
			data: []
		}
	]
};


const onRefresh = chart => {
	const now = Date.now();
	console.log("Refreshing")
	chart.data.datasets.forEach(dataset => {
		dataset.data.push({
			x: now,
			y: Math.random() * 100
		});
	});
};

const config = {
	type: 'line',
	data: data,
	options: {
		scales: {
			x: {
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 1000,
					delay: 2000,
					onRefresh: onRefresh
				}
			},
			y: {
				title: {
					display: true,
					text: 'Value'
				}
			}
		},
		interaction: {
			intersect: false
		}
	}
};



const actions = [
	{
		name: 'Randomize',
		handler(chart) {
			chart.data.datasets.forEach(dataset => {
				dataset.data.forEach(dataObj => {
					dataObj.y = Math.random() * 100;
				});
			});
			chart.update();
		}
	},
	{
		name: 'Add Dataset',
		handler(chart) {
			const datasets = chart.data.datasets;
			const newDataset = {
				label: 'Dataset ' + (datasets.length + 1),
				data: []
			};
			datasets.push(newDataset);
			chart.update();
		}
	},
	{
		name: 'Add Data',
		handler(chart) {
			onRefresh(chart);
			chart.update();
		}
	},
	{
		name: 'Remove Dataset',
		handler(chart) {
			chart.data.datasets.pop();
			chart.update();
		}
	},
	{
		name: 'Remove Data',
		handler(chart) {
			chart.data.datasets.forEach(dataset => {
				dataset.data.shift();
			});
			chart.update();
		}
	}
];

function TestGraph() {
	return (
		<div className="App">
			<Line data={config.data} options={config.options} actions={actions} />

		</div>
	);
}

export default TestGraph;
