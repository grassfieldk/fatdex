import { Group, Text, type TextProps } from "@mantine/core";
import { formatSigned, toneOfChange } from "@/lib/stats";
import { TREND_COLORS, TREND_ICONS } from "./trend";

type ChangeIndicatorProps = {
  change: number;
  changePct: number;
  /** 変化量の後ろに付ける単位（例: "kg"） */
  unit?: string;
  fz?: TextProps["fz"];
  iconSize?: number;
  justify?: "flex-start" | "flex-end";
};

/** 前日比などの騰落表示。トレンドアイコン＋符号付き変化量＋変化率 */
export function ChangeIndicator({
  change,
  changePct,
  unit,
  fz = "sm",
  iconSize = 16,
  justify = "flex-start",
}: ChangeIndicatorProps) {
  const tone = toneOfChange(change);
  const TrendIcon = TREND_ICONS[tone];

  return (
    <Group gap={4} c={TREND_COLORS[tone]} justify={justify} align="center" wrap="nowrap">
      <TrendIcon size={iconSize} />
      <Text ff="monospace" fz={fz} fw={600} c="inherit">
        {formatSigned(change)}
        {unit ? ` ${unit}` : ""} ({formatSigned(changePct, 2)}%)
      </Text>
    </Group>
  );
}
