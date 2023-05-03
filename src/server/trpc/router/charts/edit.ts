import { ChartSettings } from '@prisma/client';
import { prisma } from '../../../../server/db/client';
import { Album } from '../../../../types/Albums';

export const lastFmImageOrigin = 'https://lastfm.freetls.fastly.net/i/u/174s/';

export const formatUrl = (url: string) => {
  if (url.length < 43) {
    return '';
  }

  if (url.substring(0, 43) !== lastFmImageOrigin) {
    return '';
  }

  return url;
};

export const formatColor = (url: string) => {
  if (url.length > 16) {
    return '';
  }

  if (url.substring(0, 1) === '#' && url.length > 7) {
    return '';
  }

  return url;
};

export type WritableChartSettings = Omit<
  Omit<ChartSettings, 'chart_id'>,
  'uuid'
>;

export const editChart = async (
  chartUuid: string,
  albums: Album[],
  name: string,
  settings: WritableChartSettings,
  userId?: string
) => {
  console.log('\n\n\neditChart');
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

  console.log('const chart = await prisma.chart.update({');
  const chart = await prisma.chart.update({
    where: {
      uuid: chartUuid,
    },
    data: {
      name,
      ChartSettings: {
        update: {
          background_color: settings.background_color,
          border_color: settings.border_color,
          border_size: settings.border_size,
          show_albums: settings.show_albums,
          show_title: settings.show_title,
          text_color: settings.text_color,
          title_background_color: settings.title_background_color,
        },
      },
      Album: {
        set: [],
      },
    },
  });

  console.log('\n\nconst albumsInChart = await prisma.album.createMany({');
  const albumsInChart = await prisma.album.createMany({
    data: albums.map((album: Album) => ({
      name: album.name,
      artist: album.artist,
      album_art_url: formatUrl(album.imageUrl),
      chart_id: chartUuid,
    })),
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
