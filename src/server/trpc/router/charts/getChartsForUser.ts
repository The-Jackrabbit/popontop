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
  
  console.log({ user });

}