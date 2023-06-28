import CPUGraph from "blocks/CPUGraph";
import { FC, useEffect, useState } from "react";
import SystemService from "services/SystemService";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import '../../assets/css/SystemDashboard.css'
import PieChartCard from "views/admin/default/components/PieChartCard";
import LineChart from "components/charts/LineChart";
import HardwareComponent from "models/HardwareComponents/HardwareComponent";
import HardwareLineGraphCard from "components/charts/HardwareLineGraphCard";
import HardwarePieChartCard from "components/charts/HardwarePieChartCard";

const SystemDashboard: FC = (props) => {
	const [components, setComponents] = useState<any[]>();

	const intervalTime = 2000;

	const initComponents = async () => {
		const _comps = await SystemService.getSystemHardware();
		console.log(_comps);
		setComponents(_comps);
	}

	useEffect(() => {
		initComponents();
	}, []);


	return (
		<>
			{components && (
				<>
					<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
						{/* <LineChart
						interval={intervalTime}
						component={components.find(a => a.$type == 'CPU')}
						icon={components.find(a => a.$type == 'CPU').icon()}
					/> */}
						<HardwareLineGraphCard
							interval={intervalTime}
							component={components.find(a => a.$type == 'CPU')}
						/>
						<HardwareLineGraphCard
							interval={intervalTime}
							component={components.find(a => a.$type == 'MEMORY')}
						/>
						{/* <WeeklyRevenue />
						<PieChartCard /> */}

					</div >
					<div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
						<HardwarePieChartCard 
							interval={5000}
							component={components.find(a => a.$type == 'DISK')}
						/>
					</div>
				</>
			)}
		</>
	)
}
export default SystemDashboard;