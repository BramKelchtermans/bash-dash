import Card from "components/card";
import { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import PieOptions from "./ChartOptions/PieOptions";
import HardwareComponent from "models/HardwareComponents/HardwareComponent";
import { Col, Row } from "reactstrap";

interface Props {
    component: HardwareComponent;
    interval: number;
}
const HardwarePieChartCard: FC<Props> = (props) => {
    const [chartOptions, setChartOptions] = useState<any>({});
    const [chartSeries, setChartSeries] = useState<any>([]);

    const [pieData, setPieData] = useState<any>();

    const init = async () => {
        let data = await props.component.pieData();
        setPieData(data);

        const _series = [];
        const _labels = [];
        const _colors = [];
        data = Array.from(data).sort((a, b) => a.pct - b.pct);
        for (let part of data) {
            _series.push(part.pct);
            _labels.push(part.label);
            _colors.push(part.color);
        }
        setChartSeries(_series);
        setChartOptions(PieOptions(_labels, _colors));

    }

    const DetailBlock = (props: any) => {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: props.data.color }} />
                    <p className="ml-1 text-sm font-normal text-gray-600 m-0">{props.data.label} ({Math.round(props.data.pct)}%)</p>
                </div>
                <p className="mt-px text-xl font-bold text-navy-700  dark:text-white ">
                    {Math.round(props.data.value)} {props.unit}
                </p>

            </div>
        )
    }

    useEffect(() => {
        init();

        const interval = setInterval(() => {
            init();
        }, props.interval)
        return () => {
            clearInterval(interval);
        }
    }, [])
    return (
        <Card extra="rounded-[20px] p-3">
            <div className="flex flex-row justify-between px-3 pt-2">
                <div>
                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                        {props.component.$name}
                    </h4>
                </div>
            </div>

            <div className="mb-auto flex h-[220px] w-full items-center justify-center">
                <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="pie"
                    width="100%"
                    height="100%"
                />
            </div>
            <Row>
                {pieData && pieData.map((data: any, index: number) => {
                    return (
                        <Col sm="12" md="6">
                            <DetailBlock key={index} data={data} unit={props.component.unit()} />
                        </Col>
                    )
                })}
            </Row>
            {/* <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">

                <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
                        <p className="ml-1 text-sm font-normal text-gray-600">System</p>
                    </div>
                    <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
                        25%
                    </p>
                </div>
            </div> */}
        </Card>
    )
}
export default HardwarePieChartCard;