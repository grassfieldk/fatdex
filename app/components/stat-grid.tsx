import {
  formatSigned,
  toneOfChange,
  type WeightStats,
} from "@/lib/stats";
import { SectionCard } from "./ui/section-card";
import { StatItem } from "./ui/stat-item";

type StatGridProps = {
  stats: WeightStats;
};

export function StatGrid({ stats }: StatGridProps) {
  return (
    <SectionCard title="サマリー統計">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatItem label="52週高値" value={`${stats.high52w.toFixed(1)} kg`} />
        <StatItem label="52週安値" value={`${stats.low52w.toFixed(1)} kg`} />
        <StatItem label="30日平均" value={`${stats.avg30d.toFixed(1)} kg`} />
        <StatItem label="現在BMI" value={stats.bmi.toFixed(1)} />
        <StatItem
          label="目標差分"
          value={`${formatSigned(stats.targetDiff)} kg`}
          tone={toneOfChange(stats.targetDiff)}
        />
        <StatItem
          label="開始差分"
          value={`${formatSigned(stats.startDiff)} kg`}
          tone={toneOfChange(stats.startDiff)}
        />
      </dl>
    </SectionCard>
  );
}
