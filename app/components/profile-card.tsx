import type { WeightProfile } from "@/lib/types";
import { formatDateJa, formatSigned, type WeightStats } from "@/lib/stats";
import { SectionCard } from "./ui/section-card";
import { StatItem } from "./ui/stat-item";

type ProfileCardProps = {
  profile: WeightProfile;
  stats: WeightStats;
};

export function ProfileCard({ profile, stats }: ProfileCardProps) {
  return (
    <SectionCard title="デブ情報">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatItem label="年齢" value={`${profile.age}歳`} />
        <StatItem label="身長" value={`${profile.height} cm`} />
        <StatItem label="体型" value={stats.bmiCategory} />
        <StatItem label="目標体重" value={`${profile.targetWeight.toFixed(1)} kg`} />
        <StatItem
          label="目標まで"
          value={`${formatSigned(-stats.targetDiff)} kg`}
        />
        <StatItem label="計測開始日" value={formatDateJa(profile.startDate)} />
      </dl>
      <p className="mt-4 border-t border-gray-200 pt-4 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:text-gray-300">
        {profile.description}
      </p>
    </SectionCard>
  );
}
