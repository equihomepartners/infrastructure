import { jsx as _jsx } from "react/jsx-runtime";
import { Pie } from 'react-chartjs-2';
import { sampleDeals } from '../../data/sampleDeals';
import './ChartConfig';
const PortfolioDistribution = () => {
    const total = sampleDeals.reduce((sum, deal) => sum + deal.loanAmount, 0);
    const data = {
        labels: sampleDeals.map(deal => deal.suburb),
        datasets: [
            {
                data: sampleDeals.map(deal => deal.loanAmount),
                backgroundColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6',
                    '#EC4899',
                    '#6366F1',
                    '#14B8A6'
                ],
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const percentage = ((value / total) * 100).toFixed(1);
                                return {
                                    text: `${label} (${percentage}%)`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            title: {
                display: true,
                text: 'Portfolio Distribution by Suburb',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        }
    };
    return (_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsx("div", { className: "h-[400px] flex justify-center", children: _jsx("div", { className: "w-[90%] h-full", children: _jsx(Pie, { data: data, options: options }) }) }) }));
};
export default PortfolioDistribution;
