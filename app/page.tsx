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
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-8 sm:px-6">
      <PriceHeader profile={profile} stats={stats} />
      <SectionCard>
        <WeightChart candles={data} />
      </SectionCard>
      <StatGrid stats={stats} />
      <ProfileCard profile={profile} stats={stats} />
    </div>
  );
}
