import { prisma } from '../../../../server/db/client';
import { Album } from '../../../../types/Albums';
import { WritableChartSettings } from '../../../../types/Charts';
import {
  buildDataForAlbums,
  buildSettingsForChart,
  sanitizeToString,
} from '../../../utils/sanitization';

export const editChart = async (
  chartUuid: string,
  albums: Album[],
  name: string,
  settings: WritableChartSettings,
  userId?: string
) => {
  const originalChart = await prisma.chart_to_user.findFirst({
    where: {
      Chart: {
        uuid: chartUuid,
      },
    },
  });

  if (originalChart?.user_id !== userId) {
    throw new Error();
  }

  await prisma.album.deleteMany({
    where: {
      chart_id: chartUuid,
    },
  });

  const chart = await prisma.chart.update({
    where: {
      uuid: chartUuid,
    },
    data: {
      name: sanitizeToString(name),
      ChartSettings: {
        update: buildSettingsForChart(settings),
      },
      Album: {
        set: [],
      },
    },
  });

  const albumsInChart = await prisma.album.createMany({
    data: buildDataForAlbums(albums, chartUuid),
    skipDuplicates: true,
  });

  const chartSettings = await prisma.chartSettings.findFirst({
    where: {
      Chart: {
        uuid: chartUuid,
      },
    },
  });

  return {
    chart,
    chartSettings,
    albumsInChart,
  };
};
