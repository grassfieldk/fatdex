import { Stack, Text } from "@mantine/core";
import type { Tone } from "@/lib/stats";
import { TREND_COLORS } from "./trend";

type StatItemProps = {
  label: string;
  value: string;
  /** 騰落など値の意味に応じた色付け */
  tone?: Tone;
};

/** ラベル＋値のペア表示。統計グリッド・プロフィールで共用 */
export function StatItem({ label, value, tone = "default" }: StatItemProps) {
  return (
    <Stack gap={2}>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
      <Text
        size="sm"
        fw={600}
        ff="monospace"
        c={tone === "default" ? undefined : TREND_COLORS[tone]}
      >
        {value}
      </Text>
    </Stack>
  );
}
