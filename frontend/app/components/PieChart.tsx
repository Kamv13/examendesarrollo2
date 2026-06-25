'use client';

import { useContext } from "react";
import { ChartContext } from "../context/ChartContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
    "#6366f1", "#f59e0b", "#10b981", "#ef4444",
    "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6",
    "#f97316", "#84cc16",
];

export function PieChart() {
    const { productsByBrand, } = useContext(ChartContext);

    const data = {
        labels: productsByBrand.map(item => item.brand_code),
        datasets: [
            {
                data: productsByBrand.map(item => item.total),
                backgroundColor: productsByBrand.map((_, i) => COLORS[i % COLORS.length]),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "right" as const },
        },
    };

    return <Pie data={data} options={options} />;
}