import type { WeightProfile } from "@/lib/types";
import {
  formatDateJa,
  formatSigned,
  toneOfChange,
  type WeightStats,
} from "@/lib/stats";
import { ThemeToggle } from "./theme-toggle";

const changeClasses = {
  up: "text-green-600 dark:text-green-500",
  down: "text-red-600 dark:text-red-500",
  default: "text-gray-500 dark:text-gray-400",
} as const;

type PriceHeaderProps = {
  profile: WeightProfile;
  stats: WeightStats;
};

export function PriceHeader({ profile, stats }: PriceHeaderProps) {
  const tone = toneOfChange(stats.change);
  const arrow = tone === "up" ? "▲" : tone === "down" ? "▼" : "—";

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-sm font-semibold text-gray-500 dark:text-gray-400">
            {profile.ticker}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {profile.name}
          </h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {profile.exchange} · {profile.sector}
          </span>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-4xl font-bold text-gray-900 dark:text-gray-50">
          {stats.latestClose.toFixed(1)}
          <span className="ml-1 text-lg font-medium text-gray-500 dark:text-gray-400">
            kg
          </span>
        </span>
        <span className={`font-mono text-lg font-semibold ${changeClasses[tone]}`}>
          {arrow} {formatSigned(stats.change)} kg (
          {formatSigned(stats.changePct, 2)}%)
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDateJa(stats.latestDate)}時点
        </span>
      </div>
    </header>
  );
}
