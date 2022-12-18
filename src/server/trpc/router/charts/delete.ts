import { prisma } from '../../../../server/db/client';

export const deleteChart = async (chartUuid: string, userId: string) => {
  const originalChart = await prisma.chart_to_user.findFirst({
    where: {
      Chart: {
        uuid: chartUuid,
      },
    },
  });

  if (originalChart?.user_id !== userId) {
    throw new Error('not the same user');
  }

  await prisma.album.deleteMany({
    where: {
      Chart: {
        uuid: chartUuid,
      },
    },
  });

  await prisma.chartSettings.delete({
    where: {
      chart_id: chartUuid,
    },
  });

  await prisma.chart_to_user.deleteMany({
    where: {
      chart_id: chartUuid,
    },
  });

  await prisma.chart.delete({
    where: {
      uuid: chartUuid,
    },
  });

  return {
    status: 'okiedokie',
  };
};
