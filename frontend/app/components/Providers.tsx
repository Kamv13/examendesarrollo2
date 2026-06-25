'use client';

import { View } from "../modelos/chart";
import { ChartProvider } from "../provider/ChartProvider";

export function Providers({ children }: View) {
  return (
    <ChartProvider>
      {children}
    </ChartProvider>
  );
}   