import React, { FC, useEffect, useState } from "react";
import StreamingPlugin from 'chartjs-plugin-streaming';
import { Chart as ChartJS, registerables } from 'chart.js'
import 'chartjs-adapter-moment';
import { Line, Chart } from "react-chartjs-2";
import Card from "components/card";
import ColorUtils from "utils/ColorUtils";

ChartJS.register(...registerables)
ChartJS.register(StreamingPlugin)
interface Props {
    icon: JSX.Element;
    title: string;
    interval: number;
    value: string;
    data: Array<{
        name: string,
        color: string,
        dataPoints: Array<{
            x: number,
            y: number
        }>
    }>;
    getPoint: () => Promise<{ x: number, y: number }>;
}

const LineChart: FC<Props> = (props) => {

    const [data, setData] = useState<any[]>();

    const parseData = () => {
        const result = [];
        for (let set of props.data) {
            const color = ColorUtils.stringToColor(set.color);
            result.push({
                label: set.name,
                backgroundColor: 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 0.2)',
                borderColor: 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 0.7)',
                data: set.dataPoints,
                cubicInterpolationMode: 'monotone',
                fill: true,
                pointRadius: 0
            })
        }
        setData(result);
    }

    useEffect(() => {
        parseData()

    }, [])
    return (
        <>
            <Card extra="!p-[20px] text-center">
                <div className="graph-header !p-[20px]">

                    <div className="flex justify-between">
                        <button
                            className="graph-icon"
                        // style={{
                        //     backgroundColor: 'rgba(108, 187, 60, 0.15)',
                        //     color: ' rgb(65, 163, 23)'
                        // }}
                        >
                            {props.icon}
                            <span>{props.title}</span>

                        </button>

                        {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-success p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdBarChart className="h-6 w-6" />
                </button> */}
                    </div>
                    <div className="text-left">
                        <p className="text-3xl font-bold text-navy-700 dark:text-white">
                            {props.value}
                        </p>
                        <p className="text-sm text-gray-600">Total load</p>
                    </div>
                </div>
                <div
                    className="graph-chart-container "
                >
                    {data &&
                        <Line
                            data={{
                                datasets: data
                            }}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales: {
                                    x: {
                                        display: false,
                                        type: 'realtime',
                                        realtime: {
                                            duration: 60000,
                                            delay: props.interval * 2,
                                            onRefresh: async (chart) => {
                                                const point = await props.getPoint();
                                                chart.data.datasets[0].data.push(point);
                                            },
                                            refresh: props.interval
                                        }
                                    },
                                    y: {
                                        display: false,
                                        max: 100,
                                        min: 0
                                    }
                                }
                            }}
                        />
                    }
                </div>

            </Card >
        </>
    )
}
export default LineChart;