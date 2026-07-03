import {
  IconArrowRight,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { Tone } from "@/lib/stats";

/** 株価流の騰落配色。上昇=teal、下落=red、変化なし=dimmed */
export const TREND_COLORS = {
  up: "teal.6",
  down: "red.6",
  default: "dimmed",
} as const satisfies Record<Tone, string>;

export const TREND_ICONS = {
  up: IconTrendingUp,
  down: IconTrendingDown,
  default: IconArrowRight,
} as const satisfies Record<Tone, React.ElementType>;
