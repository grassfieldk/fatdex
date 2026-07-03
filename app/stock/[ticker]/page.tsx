import { notFound } from "next/navigation";
import { Container, Stack } from "@mantine/core";
import { getStock, getStocks } from "@/lib/weight";
import { calcStats } from "@/lib/stats";
import { BackLink } from "../../components/back-link";
import { PriceHeader } from "../../components/price-header";
import { WeightChart } from "../../components/weight-chart";
import { StatGrid } from "../../components/stat-grid";
import { ProfileCard } from "../../components/profile-card";
import { SectionCard } from "../../components/ui/section-card";

export function generateStaticParams() {
  return getStocks().map((stock) => ({ ticker: stock.profile.ticker }));
}

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const stock = getStock(ticker);
  if (!stock) notFound();

  const { profile, data } = stock;
  const stats = calcStats(profile, data);

  return (
    <Container size="lg" px={{ base: "sm", sm: "md" }} py={{ base: "md", sm: "xl" }} w="100%">
      <Stack gap="md">
        <BackLink />
        <PriceHeader profile={profile} stats={stats} />
        <SectionCard>
          <WeightChart candles={data} />
        </SectionCard>
        <StatGrid stats={stats} />
        <ProfileCard profile={profile} stats={stats} />
      </Stack>
    </Container>
  );
}
