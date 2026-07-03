"use client";

import Link from "next/link";
import { Anchor, Group } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";

export function BackLink() {
  return (
    <Anchor component={Link} href="/" size="sm" c="dimmed" underline="never">
      <Group gap={2} align="center" wrap="nowrap">
        <IconChevronLeft size={16} />
        銘柄一覧へ戻る
      </Group>
    </Anchor>
  );
}
