import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement,
	LineElement
} from 'chart.js';
import useGetStats from '../../hooks/useGetStats';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement,
	LineElement
);

const ProgressTracker = () => {
	const [stats, setStats] = useState<any>(null);
	const { loading, getStats } = useGetStats();

	const fetchStats = async () => {
		const res = await getStats();
		setStats(res);
	};

	useEffect(() => {
		fetchStats();
	}, []);

	if (loading || !stats) {
		return <div className="text-center text-white p-6">Loading stats...</div>;
	}

	const data = {
		totalProblems: stats.problems || 0,
		problemsBySDG: {
			sdg13: stats.problems13 || 0,
			sdg14: stats.problems14 || 0,
			sdg15: stats.problems15 || 0
		},
		projectStatus: {
			pending: {
				sdg13: Math.min(stats.pendingProblems, stats.problems13) || 0,
				sdg14: Math.min(stats.pendingProblems, stats.problems14) || 0,
				sdg15: Math.min(stats.pendingProblems, stats.problems15) || 0
			},
			ongoing: {
				sdg13: Math.min(stats.ongoingProblems, stats.problems13) || 0,
				sdg14: Math.min(stats.ongoingProblems, stats.problems14) || 0,
				sdg15: Math.min(stats.ongoingProblems, stats.problems15) || 0
			},
			resolved: {
				sdg13: (stats.problems13 || 0) - (stats.pendingProblems || 0) - (stats.ongoingProblems || 0),
				sdg14: (stats.problems14 || 0),
				sdg15: (stats.problems15 || 0)
			}
		},
		resolvedComparison: {
			byUsers: stats.resolvedForUser || 0,
			byGovt: stats.resolvedForGovt || 0
		},
		fundsRaised: {
			sdg13: stats.funds13 || 0,
			sdg14: stats.funds14 || 0,
			sdg15: stats.funds15 || 0
		}
	};

	const sdgColors = {
		sdg13: '#3E7E3E',
		sdg14: '#0077BE',
		sdg15: '#56C02B'
	};

	const problemsData = {
		labels: ['SDG 13: Climate Action', 'SDG 14: Life Below Water', 'SDG 15: Life on Land'],
		datasets: [{
			data: [data.problemsBySDG.sdg13, data.problemsBySDG.sdg14, data.problemsBySDG.sdg15],
			backgroundColor: [sdgColors.sdg13, sdgColors.sdg14, sdgColors.sdg15],
			borderWidth: 2,
			borderColor: '#ffffff'
		}]
	};

	const projectStatusData = {
		labels: ['SDG 13', 'SDG 14', 'SDG 15'],
		datasets: [
			{
				label: 'Pending',
				data: [data.projectStatus.pending.sdg13, data.projectStatus.pending.sdg14, data.projectStatus.pending.sdg15],
				backgroundColor: '#FF6B6B',
				borderRadius: 4
			},
			{
				label: 'Ongoing',
				data: [data.projectStatus.ongoing.sdg13, data.projectStatus.ongoing.sdg14, data.projectStatus.ongoing.sdg15],
				backgroundColor: '#4ECDC4',
				borderRadius: 4
			},
			{
				label: 'Resolved',
				data: [data.projectStatus.resolved.sdg13, data.projectStatus.resolved.sdg14, data.projectStatus.resolved.sdg15],
				backgroundColor: '#45B7D1',
				borderRadius: 4
			}
		]
	};

	const resolutionData = {
		labels: ['User Reports', 'Government Reports'],
		datasets: [{
			label: 'Resolved Problems',
			data: [data.resolvedComparison.byUsers, data.resolvedComparison.byGovt],
			backgroundColor: ['#FF9F43', '#6C5CE7'],
			borderRadius: 6,
			borderSkipped: false
		}]
	};

	const fundsData = {
		labels: ['SDG 13: Climate Action', 'SDG 14: Life Below Water', 'SDG 15: Life on Land'],
		datasets: [{
			label: 'Funds Raised (₹)',
			data: [data.fundsRaised.sdg13, data.fundsRaised.sdg14, data.fundsRaised.sdg15],
			backgroundColor: [sdgColors.sdg13, sdgColors.sdg14, sdgColors.sdg15],
			borderRadius: 8,
			borderSkipped: false
		}]
	};

	// === Chart options remain same ===
	const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const } } };
	const barOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } };
	const stackedBarOptions = { ...barOptions, scales: { x: { stacked: true }, y: { stacked: true } } };

	return (
		<div className="min-h-screen bg-slate-900 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-100 mb-2">SDG Monitoring Dashboard</h1>
					<p className="text-lg text-gray-300">Climate Action, Life Below Water & Life on Land</p>
				</div>

				{/* Metrics */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white rounded-lg shadow-md p-6 text-center">
						<h3>Total Problems</h3>
						<p className="text-3xl font-bold">{data.totalProblems}</p>
					</div>
					<div className="bg-white rounded-lg shadow-md p-6 text-center">
						<h3>Active Projects</h3>
						<p className="text-3xl font-bold text-blue-600">
							{data.projectStatus.ongoing.sdg13 + data.projectStatus.ongoing.sdg14 + data.projectStatus.ongoing.sdg15}
						</p>
					</div>
					<div className="bg-white rounded-lg shadow-md p-6 text-center">
						<h3>Total Resolved</h3>
						<p className="text-3xl font-bold text-green-600">
							{data.projectStatus.resolved.sdg13 + data.projectStatus.resolved.sdg14 + data.projectStatus.resolved.sdg15}
						</p>
					</div>
					<div className="bg-white rounded-lg shadow-md p-6 text-center">
						<h3>Total Funds</h3>
						<p className="text-3xl font-bold text-purple-600">
							₹{(data.fundsRaised.sdg13 + data.fundsRaised.sdg14 + data.fundsRaised.sdg15).toLocaleString()}
						</p>
					</div>
				</div>

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2>Problems Distribution by SDG</h2>
						<div className="h-80"><Doughnut data={problemsData} options={chartOptions} /></div>
					</div>
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2>Project Status Overview</h2>
						<div className="h-80"><Bar data={projectStatusData} options={stackedBarOptions} /></div>
					</div>
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2>Resolution Reporting Comparison</h2>
						<div className="h-80"><Bar data={resolutionData} options={barOptions} /></div>
					</div>
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2>Funds Raised by SDG</h2>
						<div className="h-80"><Bar data={fundsData} options={barOptions} /></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProgressTracker;