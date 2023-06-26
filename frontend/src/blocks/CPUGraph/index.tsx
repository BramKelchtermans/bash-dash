import React, { FC, useState, useContext, useEffect, useMemo, useRef } from 'react';
import Card from "components/card";
import SystemService from 'services/SystemService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaMicrochip } from 'react-icons/fa';
import { Col, Row } from 'reactstrap';
import si from 'systeminformation';
import ReactApexChart from 'react-apexcharts';
import CPUChartOptions from './chartOptions';
import { Line } from 'react-chartjs-2';
import LineChart from 'components/charts/LineChart';
import { Chart as ChartJS } from 'chart.js'

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
                'color': hexColors[i],
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