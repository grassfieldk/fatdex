"use client";

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
    <div className="flex gap-1">
      {PERIODS.map((period) => (
        <button
          key={period.key}
          type="button"
          onClick={() => onChange(period.key)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            active === period.key
              ? "bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900"
              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
