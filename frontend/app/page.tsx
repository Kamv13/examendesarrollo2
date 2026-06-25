'use client';

import { LineChart } from "./components/LineChart";
import { PieChart } from "./components/PieChart";

export default function Home() {
  return (

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Valor Promedio por Categoría</h2>
          <LineChart />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Productos por Marca</h2>
          <PieChart />
        </div>
      </div>
  );
}