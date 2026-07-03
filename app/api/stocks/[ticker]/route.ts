import { getStock } from "@/lib/weight";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ticker: string }> },
) {
  const { ticker } = await params;
  const stock = getStock(ticker);
  if (!stock) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  return Response.json(stock);
}
