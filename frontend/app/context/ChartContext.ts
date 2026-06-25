'use client';

import { createContext } from "react";
import { AvgPriceByCategory, ProductsByBrand } from "../modelos/chart";

export const ChartContext = createContext({
  avgPriceByCategory: [] as AvgPriceByCategory[],
  productsByBrand: [] as ProductsByBrand[],
});