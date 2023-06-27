import React, { FC, Suspense, useEffect, useRef, useState } from "react";
import StreamingPlugin from 'chartjs-plugin-streaming';
import { Chart as ChartJS, registerables } from 'chart.js'
import 'chartjs-adapter-moment';
import { Line, Chart } from "react-chartjs-2";
import Card from "components/card";
import ColorUtils from "utils/ColorUtils";
import HardwareComponent from "models/HardwareComponents/HardwareComponent";

ChartJS.register(...registerables)
ChartJS.register(StreamingPlugin)
interface Props {
    icon: JSX.Element;
    component: any;
    // title: string;
    interval: number;
    // value: string;
    // data: Array<{
    //     name: string,
    //     color: string,
    //     dataPoints: Array<{
    //         x: number,
    //         y: number
    //     }>
    // }>;
    // getPoint: () => Promise<{ x: number, y: number }>;
}

const LineChart: FC<Props> = (props) => {

    const [data, setData] = useState<any[] | undefined>();

    const [comp, setComp] = useState(props.component);
    const [currentValue, setCurrentValue] = useState(0);

    const lineRef = useRef<any>();

    const init = async () => {
        const lines = await props.component.lines();

        const result = [];
        for (let set of lines) {
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
        init();
        return () => {
            if (lineRef.current)
                lineRef.current.destroy();
            console.log(lineRef.current)
            setData(undefined);
        }
    }, [])
    return (
        <Suspense>
            {comp && data &&
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
                                {comp.icon()}
                                <span>{comp.$name}</span>

                            </button>

                            {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-success p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdBarChart className="h-6 w-6" />
                </button> */}
                        </div>
                        <div className="text-left">
                            <p className="text-3xl font-bold text-navy-700 dark:text-white">
                                { }
                            </p>
                            <p className="text-sm text-gray-600">Total load</p>
                        </div>
                    </div>
                    <div
                        className="graph-chart-container "
                    >
                        {data &&
                            <Line
                                ref={lineRef}
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
                                                    try {

                                                        const point = await comp.nextLinePoint();
                                                        chart.data.datasets[0].data.push(point);
                                                    } catch (error) {
                                                        console.error(error);
                                                    }
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
            }
        </Suspense>
    )
}
export default LineChart;