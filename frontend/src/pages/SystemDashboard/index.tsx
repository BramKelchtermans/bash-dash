import CPUGraph from "blocks/CPUGraph";
import { FC, useEffect, useState } from "react";
import SystemService from "services/SystemService";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import '../../assets/css/SystemDashboard.css'
const SystemDashboard: FC = (props) => {
    const [cpuInfo, setCPUInfo] = useState();

    const intervalTime = 1000;

    return (
        <>
            <CPUGraph
                updateInterval={intervalTime}
            />
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            </div>
        </>
    )
}
export default SystemDashboard;