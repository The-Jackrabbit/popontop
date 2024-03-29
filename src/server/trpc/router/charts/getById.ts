import { prisma } from '../../../../server/db/client';
import { Album } from '../../../../types/Albums';
import { Chart } from '../../../../types/Charts';

export const getChartById = async (
  uuid: string,
  userId: string
): Promise<Chart & { isReadOnly: boolean }> => {
  if (uuid.length === 0) {
    return {
      albums: [],
      isReadOnly: false,
      name: '',
      settings: null,
      uuid: '',
    };
  }
  const chart = await prisma.chart.findFirst({
    where: {
      uuid,
    },
    include: {
      chart_to_user: true,
    },
  });
  const albums = await prisma.album.findMany({
    where: {
      chart_id: chart?.uuid,
    },
  });
  const chartSettings = await prisma.chartSettings.findFirst({
    where: {
      chart_id: chart?.uuid,
    },
  });
  const userIdAssociatedWithChart = chart?.chart_to_user[0]?.user_id;

  return {
    albums: albums
      .sort((a, b) => {
        if (a.index === null || b.index === null) {
          return 1;
        }
        return a.index - b.index;
      })
      .map(
        (album): Album => ({
          name: album?.name ?? '',
          artist: album?.artist ?? '',
          imageUrl: album?.album_art_url ?? '',
          lastfmId: '',
        })
      ),
    isReadOnly: userIdAssociatedWithChart !== userId,
    name: chart?.name ?? '',
    settings: chartSettings,
    uuid: chart?.uuid ?? '',
  };
};
