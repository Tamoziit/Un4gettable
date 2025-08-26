export const sdgColors = {
    sdg13: '#3E7E3E',
    sdg14: '#0077BE',
    sdg15: '#56C02B'
};

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } }
};

export const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
};

export const stackedBarOptions = {
    ...barOptions,
    scales: { x: { stacked: true }, y: { stacked: true } }
};

export const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            reverse: true
        },
        y: {
            beginAtZero: true
        }
    }
};