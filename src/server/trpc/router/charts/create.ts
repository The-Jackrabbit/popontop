import { prisma } from '../../../../server/db/client';
import { Album } from '../../../../types/Albums';
import { WritableChartSettings } from '../../../../types/Charts';
import {
  buildDataForAlbums,
  buildDataForChart,
  sanitizeToString,
} from '../../../utils/sanitization';

export interface Settings {
  backgroundColor: string;
  borderColor: string;
  borderSize: number;
  showEntries: boolean;
  showTitle: boolean;
  textColor: string;
}

export const createChart = async (
  albums: Album[],
  name: string,
  settings: WritableChartSettings,
  userId?: string
) => {
  const chart = await prisma.chart.create({
    data: {
      name: sanitizeToString(name),
    },
  });

  if (userId) {
    await prisma.chart_to_user.create({
      data: {
        user_id: sanitizeToString(userId),
        chart_id: sanitizeToString(chart.uuid),
      },
    });
  }

  const chartSettings = await prisma.chartSettings.create({
    data: buildDataForChart(chart, settings),
  });

  const albumsInChart = await prisma.album.createMany({
    data: buildDataForAlbums(albums, chart.uuid),
    skipDuplicates: false,
  });

  return {
    chart,
    chartSettings,
    albumsInChart,
  };
};
