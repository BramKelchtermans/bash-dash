import React, { FC, useEffect, useState } from "react";
import StreamingPlugin from 'chartjs-plugin-streaming';
import { Chart as ChartJS, registerables } from 'chart.js'
import 'chartjs-adapter-moment';
import { Line, Chart } from "react-chartjs-2";

ChartJS.register(...registerables)
ChartJS.register(StreamingPlugin)
interface Props {
    interval: number;
    data: Array<{
        name: string,
        color: string,
        dataPoints: Array<{
            x: number,
            y: number
        }>
    }>;
    onRefresh: (chart: ChartJS) => void;
}

const LineChart: FC<Props> = (props) => {

    const [data, setData] = useState<any[]>();


    function hexToRgb(hex: string) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    const stringToColor = (str: string): any => {
        if (str.includes("#")) {
            return hexToRgb(str);
        } else if (str.includes("rgb")) {
            var rgb = str.match(/\d+/g);
            return {
                r: parseInt(rgb[0]),
                g: parseInt(rgb[1]),
                b: parseInt(rgb[2])
            }
        } else {
            try {
                str = str.replace("var(--", "").replace(")", "");
                return stringToColor(getComputedStyle(document.body).getPropertyValue('--' + str));
            } catch (e) {
                console.error(e);
                return {};
            }
        }
    }


    const parseData = () => {
        const result = [];
        for (let set of props.data) {
            const color = stringToColor(set.color);
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
                                    onRefresh: props.onRefresh
                                }
                            },
                            y: {
                                display: false,
                                max: 100,
                            }
                        }
                    }}
                />
            }
        </>
    )
}
export default LineChart;