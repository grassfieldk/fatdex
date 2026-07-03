import { Badge, Group, Stack, Text, Title } from "@mantine/core";
import {
  IconArrowRight,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { WeightProfile } from "@/lib/types";
import {
  formatDateJa,
  formatSigned,
  toneOfChange,
  type WeightStats,
} from "@/lib/stats";
import { ThemeToggle } from "./theme-toggle";

const changeColors = {
  up: "teal.6",
  down: "red.6",
  default: "dimmed",
} as const;

type PriceHeaderProps = {
  profile: WeightProfile;
  stats: WeightStats;
};

const trendIcons = {
  up: IconTrendingUp,
  down: IconTrendingDown,
  default: IconArrowRight,
} as const;

export function PriceHeader({ profile, stats }: PriceHeaderProps) {
  const tone = toneOfChange(stats.change);
  const TrendIcon = trendIcons[tone];

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
        <Group gap={4} c={changeColors[tone]} align="center" wrap="nowrap">
          <TrendIcon size={20} stroke={2} />
          <Text ff="monospace" fz={{ base: "md", sm: "lg" }} fw={600} c="inherit">
            {formatSigned(stats.change)} kg ({formatSigned(stats.changePct, 2)}%)
          </Text>
        </Group>
        <Text size="xs" c="dimmed">
          {formatDateJa(stats.latestDate)}時点
        </Text>
      </Group>
    </Stack>
  );
}
