import { ChartSettings } from '@prisma/client';
import { prisma } from '../../../../server/db/client';
import { Album } from '../../../../types/Albums';

export interface Settings {
  backgroundColor: string;
  borderColor: string;
  borderSize: number;
  showAlbums: boolean;
  showTitle: boolean;
  textColor: string;
}

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

export const createChart = async (
  albums: Album[],
  name: string,
  settings: WritableChartSettings,
  userId?: string
) => {
  const chart = await prisma.chart.create({
    data: {
      name,
    },
  });

  if (userId) {
    await prisma.chart_to_user.create({
      data: {
        user_id: userId,
        chart_id: chart.uuid,
      },
    });
  }

  const chartSettings = await prisma.chartSettings.create({
    data: {
      background_color: settings.background_color,
      border_color: settings.border_color,
      border_size: settings.border_size,
      chart_id: chart.uuid,
      show_albums: settings.show_albums,
      show_title: settings.show_title,
      text_color: settings.text_color,
      title_background_color: settings.title_background_color,
    },
  });

  const albumsInChart = await prisma.album.createMany({
    data: albums.map((album: Album) => ({
      name: album.name,
      artist: album.artist,
      album_art_url: formatUrl(album.imageUrl),
      chart_id: chart.uuid,
    })),
    skipDuplicates: false, // Skip 'Bobo'
  });

  return {
    chart,
    chartSettings,
    albumsInChart,
  };
};
