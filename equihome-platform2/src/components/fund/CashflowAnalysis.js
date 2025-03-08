import { jsx as _jsx } from "react/jsx-runtime";
import { Bar } from 'react-chartjs-2';
import './ChartConfig';
const CashflowAnalysis = () => {
    const data = {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Total Cashflows',
                data: [-1740000, -3239500, 0, 0, 3592952, 6028540],
                backgroundColor: (context) => {
                    const value = context.raw;
                    return value >= 0 ? '#10B981' : '#EF4444';
                }
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Private Lending Cashflows',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `$${value.toLocaleString()}`
                }
            }
        }
    };
    return (_jsx("div", { className: "bg-white rounded-lg shadow-sm p-6", children: _jsx("div", { className: "h-[400px]", children: _jsx(Bar, { data: data, options: options }) }) }));
};
export default CashflowAnalysis;
