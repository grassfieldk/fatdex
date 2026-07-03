import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Stack } from "@mantine/core";
import { getStock, getStocks } from "@/lib/weight";
import { calcStats } from "@/lib/stats";
import { BackLink } from "@/app/components/back-link";
import { PriceHeader } from "@/app/components/price-header";
import { WeightChart } from "@/app/components/weight-chart";
import { StatGrid } from "@/app/components/stat-grid";
import { ProfileCard } from "@/app/components/profile-card";
import { SectionCard } from "@/app/components/ui/section-card";

export function generateStaticParams() {
  return getStocks().map((stock) => ({ ticker: stock.profile.ticker }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const stock = getStock(ticker);
  if (!stock) return {};
  const { name, ticker: code } = stock.profile;
  return { title: `${name} (${code}) - fatdex` };
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
