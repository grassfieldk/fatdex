import { Badge, Group, Stack, Text, Title } from "@mantine/core";
import type { WeightProfile } from "@/lib/types";
import { formatDateJa, type WeightStats } from "@/lib/stats";
import { ThemeToggle } from "./theme-toggle";
import { ChangeIndicator } from "./ui/change-indicator";

type PriceHeaderProps = {
  profile: WeightProfile;
  stats: WeightStats;
};

export function PriceHeader({ profile, stats }: PriceHeaderProps) {
  return (
    <Stack gap="xs">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group gap="sm" align="baseline">
          <Badge variant="light" size="lg" ff="monospace">
            {profile.ticker}
          </Badge>
          <Title order={1} fz={{ base: "h3", sm: "h2" }}>
            {profile.name}
          </Title>
          <Text size="xs" c="dimmed">
            {profile.exchange} · {profile.sector}
          </Text>
        </Group>
        <ThemeToggle />
      </Group>

      <Group gap="sm" align="baseline">
        <Text ff="monospace" fz={{ base: 28, sm: 36 }} fw={700} component="span">
          {stats.latestClose.toFixed(1)}
          <Text component="span" fz={{ base: "md", sm: "lg" }} fw={500} c="dimmed" ml={4}>
            kg
          </Text>
        </Text>
        <ChangeIndicator
          change={stats.change}
          changePct={stats.changePct}
          unit="kg"
          fz={{ base: "md", sm: "lg" }}
          iconSize={20}
        />
        <Text size="xs" c="dimmed">
          {formatDateJa(stats.latestDate)}時点
        </Text>
      </Group>
    </Stack>
  );
}
