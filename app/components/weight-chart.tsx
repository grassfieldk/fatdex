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
import { Group, Stack, useComputedColorScheme } from "@mantine/core";
import type { WeightCandle } from "@/lib/types";
import { ChartControls, PERIODS, type PeriodKey } from "./chart-controls";

// Mantine の teal.5 / red.6 に合わせる
const CANDLE_COLORS = {
  upColor: "#20c997",
  downColor: "#fa5252",
  borderUpColor: "#20c997",
  borderDownColor: "#fa5252",
  wickUpColor: "#20c997",
  wickDownColor: "#fa5252",
} as const;

// Mantine の gray / dark パレットに合わせたチャート配色
function themeOptions(isDark: boolean) {
  return {
    layout: {
      background: { color: "transparent" },
      textColor: isDark ? "#909296" : "#868e96",
      attributionLogo: false,
    },
    grid: {
      vertLines: { color: isDark ? "#2e2e2e" : "#f1f3f5" },
      horzLines: { color: isDark ? "#2e2e2e" : "#f1f3f5" },
    },
    timeScale: { borderColor: isDark ? "#424242" : "#dee2e6" },
    rightPriceScale: { borderColor: isDark ? "#424242" : "#dee2e6" },
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
  const isDark = useComputedColorScheme("light") === "dark";

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
    <Stack gap="sm">
      <Group justify="flex-end">
        <ChartControls active={period} onChange={setPeriod} />
      </Group>
      <div ref={containerRef} style={{ height: 400, width: "100%" }} />
    </Stack>
  );
}
