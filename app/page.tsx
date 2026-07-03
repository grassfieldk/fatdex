import { Container, Stack } from "@mantine/core";
import { getWeightData } from "@/lib/weight";
import { calcStats } from "@/lib/stats";
import { PriceHeader } from "./components/price-header";
import { WeightChart } from "./components/weight-chart";
import { StatGrid } from "./components/stat-grid";
import { ProfileCard } from "./components/profile-card";
import { SectionCard } from "./components/ui/section-card";

export default function Home() {
  const { profile, data } = getWeightData();
  const stats = calcStats(profile, data);

  return (
    <Container size="lg" px={{ base: "sm", sm: "md" }} py={{ base: "md", sm: "xl" }} w="100%">
      <Stack gap="md">
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
