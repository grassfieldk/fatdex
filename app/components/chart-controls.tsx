"use client";

import { SegmentedControl } from "@mantine/core";

export const PERIODS = [
  { key: "1M", label: "1M", days: 30 },
  { key: "3M", label: "3M", days: 90 },
  { key: "6M", label: "6M", days: 180 },
  { key: "ALL", label: "ALL", days: Infinity },
] as const;

export type PeriodKey = (typeof PERIODS)[number]["key"];

type ChartControlsProps = {
  active: PeriodKey;
  onChange: (period: PeriodKey) => void;
};

export function ChartControls({ active, onChange }: ChartControlsProps) {
  return (
    <SegmentedControl
      size="xs"
      value={active}
      onChange={(value) => onChange(value as PeriodKey)}
      data={PERIODS.map((p) => ({ value: p.key, label: p.label }))}
    />
  );
}
