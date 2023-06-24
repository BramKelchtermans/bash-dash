import React, { FC, useState, useContext, useEffect, useMemo, useRef } from 'react';
import {
    MdArrowDropUp,
    MdOutlineCalendarToday,
    MdBarChart,
    MdArrowDownward,
    MdArrowDropDown,
} from "react-icons/md";
import Card from "components/card";
import {
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import SystemService from 'services/SystemService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaMicrochip } from 'react-icons/fa';
import { Col, Row } from 'reactstrap';
import clsx from 'clsx';
import ReactApexChart from 'react-apexcharts';
interface Props {
    updateInterval: number;
}
const CPUGraph: FC<Props> = (props) => {
    const hexColors = [
        "#FF5733",
        "#42E6A4",
        "#7F8CFF",
        "#E9BC42",
        "#A53D93",
        "#4FF285",
        "#C06A2B",
        "#58D9E0",
        "#FFBE3A",
        "#4C72B9",
        "#D63F7E",
        "#1AE156",
        "#F92C8A",
        "#5FA8D0",
        "#E12E35",
        "#6DCB76",
        "#C92B5F",
        "#53E5A7",
        "#FF4821",
        "#3284D9",
        "#FF903E",
        "#4EEA93",
        "#7E4EAC",
        "#30E874",
        "#DE6B23",
        "#81D9C3",
        "#E64F2C",
        "#6B6FE0",
        "#FBB94D",
        "#4D8EC5",
        "#F64D82",
        "#43D897",
        "#D93559",
        "#59E3A1",
        "#FF622A",
        "#3972C8",
        "#FF8C5C",
        "#42E8A7",
        "#8768B1",
        "#2DEF6F",
        "#E8632E",
        "#7AC1DD",
        "#F54D6F",
        "#3EA2C5",
        "#FF982D",
        "#327ED9",
        "#FF9D59",
        "#45EAAA",
        "#9D76C5",
        "#34EF77",
        "#E87B41",
        "#8FD3EA",
        "#F94D61",
        "#45B7D9",
        "#FFA640",
        "#2B89C4",
        "#FFAD6C",
        "#41EDAB",
        "#A076C2",
        "#2AEE75",
        "#E88C42",
        "#9AD6E9",
        "#FF536A",
        "#3FA5D9"
    ];
    const [name, setName] = useState('CPU');
    const [amountCores, setAmountCores] = useState(0);

    const [chartOptions, setChartOptions] = useState<any>({
        "legend": {
            "show": false
        },
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: props.updateInterval
            }
        },
        "theme": {
            "mode": "light"
        },
        "chart": {
            "type": "line",
            "toolbar": {
                "show": false
            }
        },
        "dataLabels": {
            "enabled": false
        },
        "stroke": {
            "curve": "smooth"
        },
        "tooltip": {
            "style": {
                "fontSize": "12px",
                "backgroundColor": "#000000"
            },
            "theme": "dark",
            "x": {
                "format": "dd/MM/yy HH:mm"
            }
        },
        "grid": {
            "show": false
        },
        "xaxis": {
            "axisBorder": {
                "show": false
            },
            "axisTicks": {
                "show": false
            },
            "labels": {
                "style": {
                    "colors": "#A3AED0",
                    "fontSize": "12px",
                    "fontWeight": "500"
                }
            },
            "type": "text",
            "categories": [
                "-1min",
                "-55s",
                "-50s",
                "-45s",
                "-40s",
                "-35s",
                "-30s",
                "-25s",
                "-20s",
                "-15s",
                "-10s",
                "-5s",
                "0s",
            ],
            "convertedCatToNumeric": true
        },
        "yaxis": {
            "show": false
        }
    })

    const [currentLoad, setCurrentLoad] = useState(0);
    const [loadDifference, setLoadDifference] = useState(0);

    const [logs, setLogs] = useState<any[]>();
    const chartRef = useRef<ReactApexChart>();

    const [done, setDone] = useState(false);

    const [chartData, setChartData] = useState<any[]>();
    useMemo(() => {
        if (!logs) return ;
        const lines = [];
        const data: { [index: string]: any } = {
            'total': [],
        }

        for (let i = 0; i < amountCores; i++) {
            data['core_' + i] = [];
        }

        for (let log of logs) {
            const load = log.data.load;
            data['total'].push(load.cpu_load);
        }


        lines.push({
            'name': 'Total Load',
            'color': hexColors[0],
            'data': data['total'],
        });
        console.log(lines)
        if (!done) {
            setDone(true)
        }

        setChartData(lines)
    }, [logs])

    const parseInfo = (info: any) => {
        setName(info.name);
        setAmountCores(info.cores);

        if (info.logs.length > 0) {
            const _currentLoad = Math.round(info.logs[0].data.load.cpu_load);
            setLoadDifference(_currentLoad - currentLoad);
            setCurrentLoad(_currentLoad);
        }

        const logs = info.logs.sort((a: any, b: any) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        })
        console.log(logs)
        setLogs(logs);
    }

    const init = async () => {
        const resp = await SystemService.getCPUInfo();
        parseInfo(resp);
    }


    useEffect(() => {
        init();
        const interval = setInterval(init, props.updateInterval);
        console.log(lineChartOptionsTotalSpent)
        return () => clearInterval(interval);
    }, [])


    return (
        <Card extra="!p-[20px] text-center" style={{ height: '350px' }}>
            <div className="flex justify-between">
                <button
                    className="graph-icon"
                    style={{
                        backgroundColor: 'rgba(108, 187, 60, 0.15)',
                        color: 'color: rgb(65, 163, 23);'
                    }}
                >
                    <FaMicrochip className="w-5 h-5" />
                    <span>{name}</span>
                </button>
                {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-success p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdBarChart className="h-6 w-6" />
                </button> */}
            </div>
            <Row className="h-full">
                <Col md="1">
                    <div className="flex flex-col">
                        <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
                            {currentLoad}%
                        </p>
                        <p className="text-sm text-gray-600">Total load</p>
                    </div>
                </Col>
                <Col md="11">
                    {done &&
                        <ReactApexChart
                            ref={chartRef}
                            options={chartOptions}
                            series={chartData}
                            type="line"
                            width="100%"
                            height="100%"
                        />
                    }
                </Col>
            </Row>

        </Card >
    );
}
export default CPUGraph;