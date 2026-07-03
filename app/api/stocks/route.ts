import { getStocks } from "@/lib/weight";
import { toSummary } from "@/lib/stats";

export async function GET() {
  return Response.json({ stocks: getStocks().map(toSummary) });
}
