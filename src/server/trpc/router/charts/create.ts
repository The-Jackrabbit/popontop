import { prisma } from "../../../../server/db/client";
import { Album } from "../../../../styles/types/Albums";

export interface Settings {
  backgroundColor: string;
  borderColor: string;
  borderSize: number;
  showAlbums: boolean;
  showTitle: boolean;
  textColor: string;
}

export const lastFmImageOrigin = "https://lastfm.freetls.fastly.net/i/u/174s/";

export const formatUrl = (url: string) => {
  if (url.length < 43) {
    return '';
  }

  if (url.substring(0, 43) !== lastFmImageOrigin) {
    return '';
  }

  return url;
}

export const formatColor = (url: string) => {
  if (url.length > 16) {
    return '';
  }

  if (url.substring(0, 1) === '#' && url.length > 7) {
    return '';
  }

  return url;
}

export const createChart = async (
  albums: Album[],
  name: string,
  settings: Settings,
  userId?: string,
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
      background_color: settings.backgroundColor,
      border_color: settings.borderColor,
      border_size: settings.borderSize,
      chart_id: chart.uuid,
      show_albums: settings.showAlbums,
      show_title: settings.showTitle,
      text_color: settings.textColor,
    },
  });

  const albumsInChart = await prisma.album.createMany({
    data: albums.map((album: Album) => ({
      name: album.name,
      artist: album.artist,
      album_art_url: formatUrl(album.imageUrl),
      chart_id: chart.uuid,
    })),
    skipDuplicates: true, // Skip 'Bobo'
  })

  return {
    chart,
    chartSettings,
    albumsInChart,
  };
}
