import { prisma } from "../../../../server/db/client";

export async function getChartsForUser(userId: string) {
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


  return user?.chart_to_user.map(ctou => ({
    uuid: ctou.Chart?.uuid,
    created_at: ctou.Chart?.created_at,
    name: ctou.Chart?.name,
  }));
}