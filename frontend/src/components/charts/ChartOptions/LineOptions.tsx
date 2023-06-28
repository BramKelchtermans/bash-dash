const LineOptions = (componentId: number, xRange: number, unit: string) => {
	return (
		{
			chart: {
				id: 'line-chart-' + componentId,
				type: 'area',
				animations: {
					enabled: true,
					easing: 'linear',
					dynamicAnimation: {
						speed: 1000
					}
				},
				width: '100%',
				height: 'auto',
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				},
				offsetX: 0,
				offsetY: 0

			},
			plotOptions: {
				area: {
					borderRadius: 20
				}
			},
			tooltip: {
				enabled: false,
				y: {
					formatter: function (val: any) {
						return val + unit;
					},
					title: {
						formatter: function () {
							return "Total Load"
						}
					}
				}
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0.9,
					stops: [0, 90]
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'smooth'
			},
			markers: {
				size: 0
			},
			grid: {
				show: false
			},
			xaxis: {
				type: 'datetime',
				range: xRange,
				show: false,
				labels: {
					show: false
				},
				axisTicks: {
					show: false
				},
				axisBorder: {
					show: false
				}
			},
			yaxis: {
				min: 0,
				max: 100,
				show: false,
				labels: {
					show: false
				},
			},
			legend: {
				show: false
			}
		}
	)
}
export default LineOptions;