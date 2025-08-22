import React from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
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
    // Hardcoded sample data
    const data = {
        totalProblems: 247,
        problemsBySDG: {
            sdg13: 89,  // Climate Action
            sdg14: 76,  // Life Below Water
            sdg15: 82   // Life on Land
        },
        projectStatus: {
            pending: { sdg13: 23, sdg14: 18, sdg15: 21 },
            ongoing: { sdg13: 31, sdg14: 28, sdg15: 25 },
            resolved: { sdg13: 35, sdg14: 30, sdg15: 36 }
        },
        resolvedComparison: {
            byUsers: 101,
            byGovt: 87
        },
        fundsRaised: {
            sdg13: 125000,
            sdg14: 98000,
            sdg15: 113000
        }
    };

    // Chart configurations
    const sdgColors = {
        sdg13: '#3E7E3E', // Climate Action - Green
        sdg14: '#0077BE', // Life Below Water - Blue
        sdg15: '#56C02B'  // Life on Land - Light Green
    };

    // Problems by SDG - Doughnut Chart
    const problemsData = {
        labels: ['SDG 13: Climate Action', 'SDG 14: Life Below Water', 'SDG 15: Life on Land'],
        datasets: [{
            data: [data.problemsBySDG.sdg13, data.problemsBySDG.sdg14, data.problemsBySDG.sdg15],
            backgroundColor: [sdgColors.sdg13, sdgColors.sdg14, sdgColors.sdg15],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    // Project Status - Stacked Bar Chart
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

    // Resolution Comparison - Bar Chart
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

    // Funds Raised - Bar Chart
    const fundsData = {
        labels: ['SDG 13: Climate Action', 'SDG 14: Life Below Water', 'SDG 15: Life on Land'],
        datasets: [{
            label: 'Funds Raised ($)',
            data: [data.fundsRaised.sdg13, data.fundsRaised.sdg14, data.fundsRaised.sdg15],
            backgroundColor: [sdgColors.sdg13, sdgColors.sdg14, sdgColors.sdg15],
            borderRadius: 8,
            borderSkipped: false
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    font: { size: 12 }
                }
            }
        }
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    font: { size: 12 }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false }
            },
            y: {
                grid: { color: '#e5e5e5' },
                beginAtZero: true
            }
        }
    };

    const stackedBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    font: { size: 12 }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false }
            },
            y: {
                stacked: true,
                grid: { color: '#e5e5e5' },
                beginAtZero: true
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-100 mb-2">SDG Monitoring Dashboard</h1>
                    <p className="text-lg text-gray-300">Climate Action, Life Below Water & Life on Land</p>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Problems</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{data.totalProblems}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Active Projects</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {data.projectStatus.ongoing.sdg13 + data.projectStatus.ongoing.sdg14 + data.projectStatus.ongoing.sdg15}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Resolved</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {data.projectStatus.resolved.sdg13 + data.projectStatus.resolved.sdg14 + data.projectStatus.resolved.sdg15}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Funds</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            ${(data.fundsRaised.sdg13 + data.fundsRaised.sdg14 + data.fundsRaised.sdg15).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Problems Distribution */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Problems Distribution by SDG</h2>
                        <div className="h-80">
                            <Doughnut data={problemsData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Project Status */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Project Status Overview</h2>
                        <div className="h-80">
                            <Bar data={projectStatusData} options={stackedBarOptions} />
                        </div>
                    </div>

                    {/* Resolution Comparison */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Resolution Reporting Comparison</h2>
                        <div className="h-80">
                            <Bar data={resolutionData} options={barOptions} />
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Discrepancy: {data.resolvedComparison.byUsers - data.resolvedComparison.byGovt} problems
                            </p>
                        </div>
                    </div>

                    {/* Funding Distribution */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Funds Raised by SDG</h2>
                        <div className="h-80">
                            <Bar data={fundsData} options={barOptions} />
                        </div>
                    </div>
                </div>

                {/* SDG Information Footer */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">SDG Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 border-l-4 border-green-700">
                            <h4 className="font-semibold text-green-700">SDG 13: Climate Action</h4>
                            <p className="text-sm text-gray-600 mt-2">Take urgent action to combat climate change and its impacts</p>
                        </div>
                        <div className="text-center p-4 border-l-4 border-blue-600">
                            <h4 className="font-semibold text-blue-600">SDG 14: Life Below Water</h4>
                            <p className="text-sm text-gray-600 mt-2">Conserve and sustainably use oceans, seas and marine resources</p>
                        </div>
                        <div className="text-center p-4 border-l-4 border-green-500">
                            <h4 className="font-semibold text-green-500">SDG 15: Life on Land</h4>
                            <p className="text-sm text-gray-600 mt-2">Protect, restore and promote sustainable use of terrestrial ecosystems</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;