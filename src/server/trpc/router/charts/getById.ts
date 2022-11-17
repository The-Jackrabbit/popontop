import { prisma } from "../../../../server/db/client";
import { Album } from "../../../../styles/types/Albums";
import { Chart } from "../../../../styles/types/Charts";

export const getChartById = async (uuid: string): Promise<Chart> => {
  if (uuid.length === 0) {
    return {
      albums: [],
      name:  '',
      settings: null,
      uuid:   '',
    };
  }
  const chart = await prisma.chart.findFirst({
    where: {
      uuid,
    }
  });
  const albums = await prisma.album.findMany({
    where: {
      chart_id: chart?.uuid,
    }
  });
  const chartSettings = await prisma.chartSettings.findFirst({
    where: {
      chart_id: chart?.uuid,
    }
  });

  return {
    albums: albums.map((album): Album => ({
      name: album?.name ?? '',
      artist: album?.artist ?? '',
      imageUrl: album?.album_art_url ?? '',
      lastfmId: ''
    })),
    name: chart?.name ?? '',
    settings: chartSettings,
    uuid: chart?.uuid ?? '',
  };
};
