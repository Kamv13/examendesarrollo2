export interface AvgPriceByCategory {
  category_code: string;
  avg_price: number;
}

export interface ProductsByBrand {
  brand_code: string;
  total: number;
}

export interface View {
  children: React.ReactNode;
}