import { Container, Group, Stack, Text, Title } from "@mantine/core";
import { getStocks } from "@/lib/weight";
import { toSummary } from "@/lib/stats";
import { StockTable } from "./components/stock-table";
import { ThemeToggle } from "./components/theme-toggle";
import { SectionCard } from "./components/ui/section-card";

export default function Home() {
  const summaries = getStocks().map(toSummary);

  return (
    <Container size="lg" px={{ base: "sm", sm: "md" }} py={{ base: "md", sm: "xl" }} w="100%">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Title order={1} fz={{ base: "h3", sm: "h2" }}>
              fatdex
            </Title>
            <Text size="sm" c="dimmed">
              体重取引所 — 上場デブ一覧
            </Text>
          </Stack>
          <ThemeToggle />
        </Group>

        <SectionCard title={`上場銘柄 (${summaries.length})`}>
          <StockTable stocks={summaries} />
        </SectionCard>
      </Stack>
    </Container>
  );
}
