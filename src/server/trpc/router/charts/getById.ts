import { prisma } from "../../../../server/db/client";
import { Album } from "../../../../types/Albums";
import { Chart } from "../../../../types/Charts";

export const getChartById = async (uuid: string): Promise<Chart> => {
  console.log({ uuid })
  if (uuid.length === 0) {
    return {
      albums: [],
      name:  '',
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

  return {
    albums: albums.map((album): Album => ({
      name: album?.name ?? '',
      artist: album?.artist ?? '',
      imageUrl: album?.album_art_url ?? '',
      lastfmId: ''
    })),
    name: chart?.name ?? '',
    uuid: chart?.uuid ?? '',
  };
};
