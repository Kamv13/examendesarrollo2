'use client';

import { useContext } from "react";
import { ChartContext } from "../context/ChartContext";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function LineChart() {
    const { avgPriceByCategory, } = useContext(ChartContext);


    const data = {
        labels: avgPriceByCategory.map(item => item.category_code),
        datasets: [
            {
                label: "Average Price (USD)",
                data: avgPriceByCategory.map(item => parseFloat(item.avg_price.toFixed(2))),
                borderColor: "#6366f1",
                backgroundColor: "#6366f133",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            title: { display: false },
        },
    };

    return <Line data={data} options={options} />;
}