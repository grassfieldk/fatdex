import { Badge, Group, Stack, Text, Title } from "@mantine/core";
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

export function PriceHeader({ profile, stats }: PriceHeaderProps) {
  const tone = toneOfChange(stats.change);
  const arrow = tone === "up" ? "▲" : tone === "down" ? "▼" : "—";

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
        <Text ff="monospace" fz={{ base: "md", sm: "lg" }} fw={600} c={changeColors[tone]}>
          {arrow} {formatSigned(stats.change)} kg (
          {formatSigned(stats.changePct, 2)}%)
        </Text>
        <Text size="xs" c="dimmed">
          {formatDateJa(stats.latestDate)}時点
        </Text>
      </Group>
    </Stack>
  );
}
