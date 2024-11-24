import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    throw new Error("Missing date range parameters");
  }
  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    return NextResponse.json(queryParams.error.message, {
      status: 400,
    });
  }

  const stats = await getBalanceStats(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  );
  return NextResponse.json(stats);
}

export type GetBalanceStatsResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>;

const getBalanceStats = async (userId: string, from: Date, to: Date) => {};