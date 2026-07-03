import { Divider, SimpleGrid, Text } from "@mantine/core";
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
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} spacing="md">
        <StatItem label="年齢" value={`${profile.age}歳`} />
        <StatItem label="身長" value={`${profile.height} cm`} />
        <StatItem label="体型" value={stats.bmiCategory} />
        <StatItem label="目標体重" value={`${profile.targetWeight.toFixed(1)} kg`} />
        <StatItem
          label="目標まで"
          value={`${formatSigned(-stats.targetDiff)} kg`}
        />
        <StatItem label="計測開始日" value={formatDateJa(profile.startDate)} />
      </SimpleGrid>
      <Divider my="md" />
      <Text size="sm" c="dimmed" lh={1.7}>
        {profile.description}
      </Text>
    </SectionCard>
  );
}
