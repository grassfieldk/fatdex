import weightData from "@/data/weight-data.json";
import type { WeightData } from "./types";

export function getWeightData(): WeightData {
  return weightData as WeightData;
}
