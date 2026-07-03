import { Stack, Text } from "@mantine/core";

type StatItemProps = {
  label: string;
  value: string;
  /** 騰落など値の意味に応じた色付け */
  tone?: "default" | "up" | "down";
};

const toneColors = {
  default: undefined,
  up: "teal.6",
  down: "red.6",
} as const;

/** ラベル＋値のペア表示。統計グリッド・プロフィールで共用 */
export function StatItem({ label, value, tone = "default" }: StatItemProps) {
  return (
    <Stack gap={2}>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
      <Text size="sm" fw={600} ff="monospace" c={toneColors[tone]}>
        {value}
      </Text>
    </Stack>
  );
}
