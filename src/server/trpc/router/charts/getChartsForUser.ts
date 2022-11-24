import { prisma } from "../../../../server/db/client";

export interface IChartListItem {
  uuid: string | undefined;
  created_at: Date | null | undefined; 
  name: string | undefined;
}

export async function getChartsForUser(userId: string): Promise<IChartListItem[]> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      chart_to_user: {
        include: {
          Chart: true,
        }
      }
    }
  })
  
  // console.log({ user, ' user?.chart_to_user': user?.chart_to_user.map(ctou => JSON.stringify(ctou.Chart)) });
  if (!user || !user.chart_to_user) {
    return [];
  }

  return user.chart_to_user.map(ctou => ({
    uuid: ctou.Chart?.uuid,
    created_at: ctou.Chart?.created_at,
    name: ctou.Chart?.name,
  }));
}