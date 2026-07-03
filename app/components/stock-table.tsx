"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Group, Stack, Table, Text, TextInput } from "@mantine/core";
import {
  IconArrowRight,
  IconSearch,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import {
  formatSigned,
  toneOfChange,
  type StockSummary,
} from "@/lib/stats";

const changeColors = {
  up: "teal.6",
  down: "red.6",
  default: "dimmed",
} as const;

const trendIcons = {
  up: IconTrendingUp,
  down: IconTrendingDown,
  default: IconArrowRight,
} as const;

type StockTableProps = {
  stocks: StockSummary[];
};

export function StockTable({ stocks }: StockTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stocks;
    return stocks.filter((stock) =>
      [stock.ticker, stock.name, stock.sector].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [stocks, query]);

  return (
    <Stack gap="md">
      <TextInput
        placeholder="銘柄名・ティッカー・部門で検索"
        leftSection={<IconSearch size={16} />}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />

      <Table.ScrollContainer minWidth={480}>
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>銘柄</Table.Th>
              <Table.Th>部門</Table.Th>
              <Table.Th ta="right">現在体重</Table.Th>
              <Table.Th ta="right">前日比</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((stock) => {
              const tone = toneOfChange(stock.change);
              const TrendIcon = trendIcons[tone];
              return (
                <Table.Tr
                  key={stock.ticker}
                  onClick={() => router.push(`/stock/${stock.ticker}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <Badge variant="light" ff="monospace" miw={64}>
                        {stock.ticker}
                      </Badge>
                      <Text size="sm" fw={600}>
                        {stock.name}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {stock.sector}
                    </Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Text size="sm" ff="monospace" fw={600}>
                      {stock.latestClose.toFixed(1)} kg
                    </Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Group gap={4} justify="flex-end" c={changeColors[tone]} wrap="nowrap">
                      <TrendIcon size={16} />
                      <Text size="sm" ff="monospace" fw={600} c="inherit">
                        {formatSigned(stock.change)} ({formatSigned(stock.changePct, 2)}%)
                      </Text>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })}
            {filtered.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text size="sm" c="dimmed" ta="center" py="md">
                    「{query}」に一致するデブは見つかりませんでした
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
