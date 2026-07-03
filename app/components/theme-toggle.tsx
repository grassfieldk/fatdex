"use client";

import {
  ActionIcon,
  Box,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme("light");

  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="テーマ切替"
      onClick={() => setColorScheme(computed === "dark" ? "light" : "dark")}
    >
      {/* SSR 時はテーマが確定しないため、アイコンの出し分けは CSS のみで行う */}
      <Box component="span" darkHidden lh={0}>
        <IconMoon size={18} stroke={1.5} />
      </Box>
      <Box component="span" lightHidden lh={0}>
        <IconSun size={18} stroke={1.5} />
      </Box>
    </ActionIcon>
  );
}
