import { prisma } from "../../../../server/db/client";

export const deleteChart = async (
  chartUuid: string,
  userId: string,
) => {
  console.log('start delete');
  const originalChart = await prisma.chart_to_user.findFirst({
    where: {
      Chart: {
        uuid: chartUuid,
      },
    },
  });
  console.log('1');
  if (originalChart?.user_id !== userId) {
    throw new Error('not the same user');
  }
  console.log('2');
  await prisma.album.deleteMany({
    where: {
      Chart: {
        uuid: chartUuid,
      },
    }
  });
  console.log('3');
  await prisma.chartSettings.delete({
    where: {
      chart_id: chartUuid,
    },
  });
  console.log('4');
  await prisma.chart_to_user.deleteMany({
    where: {
      chart_id: chartUuid,
    }
  });
  console.log('5');
  await prisma.chart.delete({
    where: {
      uuid: chartUuid,
    },
  });

  console.log('6');
  return {
    status: 'okiedokie',
  };
}
