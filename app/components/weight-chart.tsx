"use client";

import { useEffect, useRef, useState } from "react";
import {
  CandlestickSeries,
  createChart,
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useTheme } from "next-themes";
import type { WeightCandle } from "@/lib/types";
import { ChartControls, PERIODS, type PeriodKey } from "./chart-controls";

const CANDLE_COLORS = {
  upColor: "#22c55e",
  downColor: "#ef4444",
  borderUpColor: "#22c55e",
  borderDownColor: "#ef4444",
  wickUpColor: "#22c55e",
  wickDownColor: "#ef4444",
} as const;

function themeOptions(isDark: boolean) {
  return {
    layout: {
      background: { color: "transparent" },
      textColor: isDark ? "#9ca3af" : "#6b7280",
      attributionLogo: false,
    },
    grid: {
      vertLines: { color: isDark ? "#1f2937" : "#f3f4f6" },
      horzLines: { color: isDark ? "#1f2937" : "#f3f4f6" },
    },
    timeScale: { borderColor: isDark ? "#374151" : "#e5e7eb" },
    rightPriceScale: { borderColor: isDark ? "#374151" : "#e5e7eb" },
  };
}

type WeightChartProps = {
  candles: WeightCandle[];
};

export function WeightChart({ candles }: WeightChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [period, setPeriod] = useState<PeriodKey>("3M");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // チャートの生成・破棄（初回のみ）
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      height: 400,
      autoSize: true,
      localization: {
        priceFormatter: (price: number) => `${price.toFixed(1)} kg`,
      },
    });
    const series = chart.addSeries(CandlestickSeries, CANDLE_COLORS);

    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // テーマ変更を反映
  useEffect(() => {
    chartRef.current?.applyOptions(themeOptions(isDark));
  }, [isDark]);

  // 期間・データ変更を反映
  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return;

    const days = PERIODS.find((p) => p.key === period)?.days ?? Infinity;
    const visible = Number.isFinite(days) ? candles.slice(-days) : candles;
    series.setData(visible as CandlestickData<Time>[]);
    chartRef.current?.timeScale().fitContent();
  }, [candles, period]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <ChartControls active={period} onChange={setPeriod} />
      </div>
      <div ref={containerRef} className="h-[400px] w-full" />
    </div>
  );
}
