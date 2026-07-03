import { getWeightData } from "@/lib/weight";

export async function GET() {
  return Response.json(getWeightData());
}
