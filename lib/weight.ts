import weightData from "@/data/weight-data.json";
import type { WeightStock } from "./types";

export function getStocks(): WeightStock[] {
  return (weightData as { stocks: WeightStock[] }).stocks;
}

export function getStock(ticker: string): WeightStock | undefined {
  return getStocks().find(
    (stock) => stock.profile.ticker.toLowerCase() === ticker.toLowerCase(),
  );
}
