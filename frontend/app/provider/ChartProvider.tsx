'use client';

import { useState, useEffect } from "react";
import { View, AvgPriceByCategory, ProductsByBrand } from "../modelos/chart";
import { ChartContext } from "../context/ChartContext";

const API = "http://localhost:5000";

export function ChartProvider({ children }: View) {
    const [avgPriceByCategory, setAvgPriceByCategory] = useState<AvgPriceByCategory[]>([]);
    const [productsByBrand, setProductsByBrand] = useState<ProductsByBrand[]>([]);


    useEffect(() => {
        Promise.all([
            fetch(`${API}/api/charts/avg-price-by-category`).then(res => res.json()),
            fetch(`${API}/api/charts/products-by-brand`).then(res => res.json()),
        ]).then(([catData, brandData]) => {
            setAvgPriceByCategory(catData.data);
            setProductsByBrand(brandData.data);
        });
    }, []);

    return (
        <ChartContext.Provider value={{ avgPriceByCategory, productsByBrand }}>
            {children}
        </ChartContext.Provider>
    );
}