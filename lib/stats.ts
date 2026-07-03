import type { WeightCandle, WeightProfile } from "./types";

export type WeightStats = {
  latestClose: number;
  latestDate: string;
  /** 前日終値との差 */
  change: number;
  /** 前日終値との変化率（%） */
  changePct: number;
  high52w: number;
  low52w: number;
  avg30d: number;
  bmi: number;
  bmiCategory: string;
  /** 目標体重との差 */
  targetDiff: number;
  /** 開始時体重との差 */
  startDiff: number;
};

function bmiCategoryOf(bmi: number): string {
  if (bmi < 18.5) return "低体重";
  if (bmi < 25) return "普通体重";
  if (bmi < 30) return "肥満1度";
  if (bmi < 35) return "肥満2度";
  if (bmi < 40) return "肥満3度";
  return "肥満4度";
}

export function calcStats(
  profile: WeightProfile,
  candles: WeightCandle[],
): WeightStats {
  const latest = candles[candles.length - 1];
  const prev = candles[candles.length - 2] ?? latest;

  const change = latest.close - prev.close;
  const last30 = candles.slice(-30);
  const heightM = profile.height / 100;
  const bmi = latest.close / (heightM * heightM);

  return {
    latestClose: latest.close,
    latestDate: latest.time,
    change,
    changePct: (change / prev.close) * 100,
    high52w: Math.max(...candles.map((c) => c.high)),
    low52w: Math.min(...candles.map((c) => c.low)),
    avg30d: last30.reduce((sum, c) => sum + c.close, 0) / last30.length,
    bmi,
    bmiCategory: bmiCategoryOf(bmi),
    targetDiff: latest.close - profile.targetWeight,
    startDiff: latest.close - profile.startWeight,
  };
}

/** 株価流: 上昇=緑(up)、下落=赤(down)。体重でも意味なくこれに従う */
export function toneOfChange(change: number): "up" | "down" | "default" {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "default";
}

export function formatSigned(value: number, digits = 1): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}`;
}

export function formatDateJa(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}
